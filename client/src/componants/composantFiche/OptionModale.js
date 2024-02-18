import React, { useEffect, useState } from "react"; // import des fonctions de react
import { useDispatch, useSelector } from "react-redux";
// import des composants constituant la page
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { FormGroup, Checkbox, FormControlLabel, Dialog } from "@mui/material";
import NewOption from "./NewOption";
import { createRelVehOpt, listRelVehOpt } from "../../features/slice/relVehiculeOptionSlice";
import { fetchOpt } from "../../features/slice/optionSlice";


export const OptionModale = (props) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const IdVehicule = props.idVehicule; //  récupére l'id du vehicule
  var onCancel = props.onCancel; //  props contenant la fonction d'effacement de la modale
  const [checkboxState, setCheckboxState] = useState({}); // État pour les cases à cocher
  const [ajoutOption, setAjoutOption] = useState(false); //
  const listeOption = useSelector((state) => state.option.option); // ensemble des prestations disponibles
  const [optionsLiees, setOptionsLiees] = useState([]); // Remplacez par les prestations déjà liées
  const [relations, setRelations] = useState([]); // Ajoutez cet état pour stocker les relations
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [nouvellesOptionsLiees, setNouvellesOptionsLiees] = useState([]);
  const [nouveauxEquipements, setNouveauxEquipements] = useState([]); // Nouvelle variable d'état pour les nouvelles prestations liées
  const [equipementsDisponibles, setEquipementsDisponibles] =
    useState(listeOption); // Remplacez par l'ensemble des prestations disponibles

  const [hasLoadedDataRelStructPresta, setHasLoadedDataRelStructPresta] =
    useState(false); // n'est pas gérer de la même manière que dans le composant partenaire
  //const [message, setMessage] = useState(""); //  message de retour de  la base de données en cas d'erreur ou si elle est vides
  // definition du style des composants icones de sauvegarde, annulation et fermeture

  const iconeStyle = {
    fontSize: "35px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const iconeStyleDelete = {
    fontSize: "15px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const prestaStyle = {
    //fontSize: "10px",
    "& .MuiSvgIcon-root": { fontSize: 13 },
    "& .MuiTypography-body1": { fontSize: 13 },
  };

  useEffect(() => {
    if (IdVehicule) {
      dispatch(listRelVehOpt({ data: IdVehicule }))
        
          .then((response) => {
       
          const res = response.payload.data;
          if (res && res.length > 0) {
            const nouveauxOptionLiees = res.map((item) => item.fk_option);
            setOptionsLiees(nouveauxOptionLiees);
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [dispatch, IdVehicule]);
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des structures liées à un partenaire
      if (!hasLoadedDataRelStructPresta) {
        //si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(
            listRelVehOpt({ data: IdVehicule })
          ); // appel du slice de chargement des données auprés de la BD pour un vehicule donné
          if (response) {
            //si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide ou qu'il n'y a pas d'equipement pour ce vehicule,  on à prévu un flag "vide" pour gérer le cas de la base vide pour l'heure on gére les 2 cas de la même manière, a savoir l'affichage du message renvoyé par le controller du serveur
              // Gérer le cas où la table est vide ou pas de structure pour le partenaire donné
              //setMessage(response.payload.message); //récupère le message renvoyé par le serveur (base vide ou structure absente)
              setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
            } else {
              const relations = response.payload.data.map((item) => ({
                id_relvehiculeoption: item.id_relvehiculeoption,
                fk_vehicule: item.fk_vehicule,
                fk_option: item.fk_option, // Ajout de l'identifiant de relation
              }));
              setRelations(relations); // Mettez à jour les relations
              setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
              //setMessage(""); // effacer le message sinon réapparait
              dispatch(fetchOpt()); // charge la liste des prestations pour  l'utiliser dans les cartes
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
          /*setMessage(
            "Une erreur est survenue lors de la recherche des structures."
          );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataRelStructPresta, IdVehicule]);
  //
  // filtre les prestations pour n'afficher que celles qui manquent

    const optionsDisponiblesFiltrees = listeOption
      ? listeOption.filter((option) => !optionsLiees.includes(option.id_option))
      : [];
  // fonction d'affichage de la partie de saisie des nouvelles prestations à reliée
  const ajoutRelVE = () => {
    setAjoutOption(true); // affiche la zone des prestations pouvant etre reliées
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowAddButton(false); // desaffiche l'icone d'ajout
  };
  // fonction de sauvegarde des nouvelles prestations à reliées à la structure
  const saveRelationEquip = async () => {
    console.log(
      "IdStructure, nouvellesPrestationsLiees",
      IdVehicule,
      nouvellesOptionsLiees
    );
    setAjoutOption(false);
    setShowSaveButton(false);
    setShowAddButton(true);
    try {
      await dispatch(
        createRelVehOpt({
          vehiculeId: IdVehicule,
          optionsIds: nouvellesOptionsLiees,
        })
      );

      // Après la sauvegarde, mettez à jour les états nécessaires
      const response = await dispatch(listRelVehOpt({ data: IdVehicule }));
      console.log("response .payload.data", response.payload.data);
      const updatedRelations = response.payload.data.map((item) => ({
        id_relvehiculeoption: item.id_relvehiculeoption,
        fk_vehicule: item.fk_vehicule,
        fk_option: item.fk_option,
      }));
      setRelations(updatedRelations);

      // Mettez à jour le tableau prestationsLiees après la sauvegarde
      const updatedPrestationsLiees = response.payload.data.map(
        (item) => item.fk_option
      );
      setOptionsLiees(updatedPrestationsLiees);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };
  // fonction executée lors du cochage d'une prestation dans la partie droite
  const handleCheckboxChange = (event) => {
    const selectedId = Number(event.target.value);
    const isChecked = checkboxState[selectedId];
    setCheckboxState((prevState) => ({
      ...prevState,
      [selectedId]: !isChecked,
    }));
    // Vérifiez si la prestation est déjà liée
    const estDejaLiee = optionsLiees.includes(selectedId);

    if (!estDejaLiee) {
      // Mettez à jour les nouvelles prestations à lier
      setNouvellesOptionsLiees((prevOptions) => {
        setShowSaveButton(true); // Affiche le bouton après l'ajout d'une prestation

        if (isChecked) {
          // Retirer la prestation si elle était cochée
          return prevOptions.filter(
            (option) => option !== selectedId
          );
        } else {
          // Ajouter la prestation si elle était décochée
          return [...prevOptions, selectedId];
        }
      });
    }

    if (!optionsLiees.includes(selectedId)) {
      if (isChecked) {
        // Retirer la prestation si elle était cochée
        setOptionsLiees((prevOptionsLiees) =>
          prevOptionsLiees.filter(
            (option) =>
              prevOptionsLiees.filter(
                (option) => option !== selectedId
              ) !== selectedId
          )
        );
      } else {
        // Ajouter la prestation si elle était décochée
        setOptionsLiees((prevOptionsLiees) => [
          ...prevOptionsLiees,
          selectedId,
        ]);
      }
    }
  };
  const deleteRelation = (id_relvehiculeoption) => {
    dispatch(deleteRelation(id_relvehiculeoption))
      .then(async (response) => {
        // Mettez à jour le tableau prestationsLiees et relations après la suppression
        const updatedData = await dispatch(listRelVehOpt({ data: IdVehicule }));

        if (updatedData.payload.okay !== "false") {
          const updatedRelations = updatedData.payload.data.map((item) => ({
            id_relvehiculeoption: item.id_relvehiculeoption,
            fk_vehicule: item.fk_vehicule,
            fk_option: item.fk_option,
          }));

          setRelations(updatedRelations);

          // Mettez à jour le tableau prestationsLiees après la suppression
          const updatedPrestationsLiees = updatedData.payload.data.map(
            (item) => item.fk_option
          );
          setOptionsLiees(updatedPrestationsLiees);
        }
      })

      .catch((error) => {
        console.error(
          "Erreur lors de la simulation de la suppression :",
          error
        );
      });
  };
  return (
    <main className="contentModale">
      <div className="entetemodal">
        <div className="titremodal">Equipements</div>
        <CancelTwoToneIcon
          className="escape"
          sx={iconeStyle}
          onClick={onCancel}
        />
        {showAddButton && (
          <AddCircleTwoToneIcon
            className="ajout"
            sx={iconeStyle}
            onClick={ajoutRelVE}
          />
        )}

        {showSaveButton && (
          <SaveTwoToneIcon
            className="save"
            sx={iconeStyle}
            onClick={saveRelationEquip}
          />
        )}
      </div>
      <div className="corpsmodale">
        <div className="liste">
          <div className="titreliste">Equipement choisies</div>
          {optionsLiees.map((optiontId) => {
            const option = listeOption.find((p) => p.id_option === optiontId);
            // Obtenir la relation correspondant à la prestation
            const relation = relations.find((r) => r.fk_option === optiontId);
            return (
              <div key={optiontId} className="itemlistepresta">
                <div>
                  {option && (
                    <div className="ajustitemliste">
                      <span>{option.Optionvehicule}</span>
                      <DeleteTwoToneIcon
                        sx={iconeStyleDelete}
                        onDoubleClick={() =>
                          deleteRelation(relation.id_relVehiculeEquipement)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="listeAjout">
          {ajoutOption && (
            <>
              {" "}
              <FormGroup>
                {optionsDisponiblesFiltrees.map((option) => (
                  <FormControlLabel
                    key={option.id_option}
                    sx={prestaStyle}
                    control={
                      <Checkbox
                        checked={checkboxState[option.id_option] || false}
                        value={option.id_option}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={option.Optionvehicule}
                  />
                ))}
              </FormGroup>
              <div className="AjoutNouvelEquipement">
                <NewOption />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default OptionModale;
