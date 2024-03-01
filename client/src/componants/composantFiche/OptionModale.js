import React, { useEffect, useState } from "react"; // import des fonctions de react
import { useDispatch, useSelector } from "react-redux";// chargement des fonctions de gestion du store
// import des composants react
import NewOption from "./NewOption";
// import des composants mui material
import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
// import des fonctions de gestion du store
import { createRelVehOpt, delRelVehOpt, listRelVehOpt } from "../../features/slice/relVehiculeOptionSlice";
import { fetchOpt } from "../../features/slice/optionSlice";
//
//composant OptionModale pour la modification des données caractéristiques d'un véhicule (props passées : onCancel: focntion callback lors de la fermeture de la modale/ idVehicule : id du véhicule concerné)
export const OptionModale = (props) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const IdVehicule = props.idVehicule; //  récupére l'id du vehicule
  var onCancel = props.onCancel; //  props contenant la fonction d'effacement de la modale
  const [checkboxState, setCheckboxState] = useState({}); // État pour les cases à cocher
  const [ajoutOption, setAjoutOption] = useState(false); //
  const listeOption = useSelector((state) => state.option.option); // ensemble des options disponibles
  const [optionsLiees, setOptionsLiees] = useState([]); // Remplacez par les options déjà liées
  const [relations, setRelations] = useState([]); // Ajoutez cet état pour stocker les relations
  const [showSaveButton, setShowSaveButton] = useState(false); // flag d'affichage de l'icone de sauvegarde
  const [showAddButton, setShowAddButton] = useState(true); // flag d'affichage de l'icone d'edition
  const [nouvellesOptionsLiees, setNouvellesOptionsLiees] = useState([]); // tableau contenant les nouvelles options du véhicule
  /*const [nouveauxEquipements, setNouveauxEquipements] = useState([]); // Nouvelle variable d'état pour les nouvelles prestations liées
  const [equipementsDisponibles, setEquipementsDisponibles] =
    useState(listeOption); // Remplacez par l'ensemble des prestations disponibles*/

  const [hasLoadedDataRelVehOpt, setHasLoadedDataRelVehOpt] = useState(false); // n'est pas gérer de la même manière que dans le composant partenaire
  // definition du style des composants icones de sauvegarde, annulation et fermeture
  const iconeStyle = {
    fontSize: "35px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // definition du style de l'icone de suppression  d'une option liée
  const iconeStyleDelete = {
    fontSize: "15px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // definition du style de l'icone de coche des options à lier
  const prestaStyle = {
    "& .MuiSvgIcon-root": { fontSize: 13 },
    "& .MuiTypography-body1": { fontSize: 13 },
  };
  // useEffect si véhicule existe, charge les données à partir de le BD
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
  // useEffect de chargement des options liées à un vehicule
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des structures liées à un partenaire
      if (!hasLoadedDataRelVehOpt) {
        //si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(listRelVehOpt({ data: IdVehicule })); // appel du slice de chargement des données auprés de la BD pour un vehicule donné
          if (response) {
            //si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide ou qu'il n'y a pas d'equipement pour ce vehicule,  on à prévu un flag "vide" pour gérer le cas de la base vide pour l'heure on gére les 2 cas de la même manière, a savoir l'affichage du message renvoyé par le controller du serveur
              // Gérer le cas où la table est vide ou pas de structure pour le partenaire donné
              //setMessage(response.payload.message); //récupère le message renvoyé par le serveur (base vide ou structure absente)
              setHasLoadedDataRelVehOpt(true); // Marquer que les données ont été chargées
            } else {
              const relations = response.payload.data.map((item) => ({
                id_relvehiculeoption: item.id_relvehiculeoption,
                fk_vehicule: item.fk_vehicule,
                fk_option: item.fk_option, // Ajout de l'identifiant de relation
              }));
              setRelations(relations); // Mettez à jour les relations
              setHasLoadedDataRelVehOpt(true); // Marquer que les données ont été chargées
              //setMessage(""); // effacer le message sinon réapparait
              dispatch(fetchOpt()); // charge la liste des prestations pour  l'utiliser dans les cartes
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataRelVehOpt(true); // Marquer que les données ont été chargées
          /*setMessage(
            "Une erreur est survenue lors de la recherche des structures."
          );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataRelVehOpt, IdVehicule]);

  // filtre les options pour n'afficher que celles qui manquent
  const optionsDisponiblesFiltrees = listeOption
    ? listeOption.filter((option) => !optionsLiees.includes(option.id_option))
    : [];
  // fonction d'affichage de la partie de saisie des nouvelles options à reliée
  const ajoutRelVO = () => {
    setAjoutOption(true); // affiche la zone des options pouvant etre reliées
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowAddButton(false); // desaffiche l'icone d'ajout
  };
  // fonction de sauvegarde des nouvelles prestations à reliées au véhicule
  const saveRelationOpt = async () => {
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
      const updatedRelations = response.payload.data.map((item) => ({
        id_relvehiculeoption: item.id_relvehiculeoption,
        fk_vehicule: item.fk_vehicule,
        fk_option: item.fk_option,
      }));
      setRelations(updatedRelations);

      // Mettez à jour le tableau OptionsLiees après la sauvegarde
      const updatedPrestationsLiees = response.payload.data.map(
        (item) => item.fk_option
      );
      setOptionsLiees(updatedPrestationsLiees);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };
  // fonction executée lors du cochage d'une option dans la partie droite
  const handleCheckboxChange = (event) => {
    const selectedId = Number(event.target.value);
    const isChecked = checkboxState[selectedId];
    setCheckboxState((prevState) => ({
      ...prevState,
      [selectedId]: !isChecked,
    }));
    // Vérifiez si l'option est déjà liée
    const estDejaLiee = optionsLiees.includes(selectedId);

    if (!estDejaLiee) {
      // Mettez à jour les nouvelles options à lier
      setNouvellesOptionsLiees((prevOptions) => {
        setShowSaveButton(true); // Affiche le bouton après l'ajout d'une prestation

        if (isChecked) {
          // Retirer la prestation si elle était cochée
          return prevOptions.filter((option) => option !== selectedId);
        } else {
          // Ajouter la prestation si elle était décochée
          return [...prevOptions, selectedId];
        }
      });
    }

    if (!optionsLiees.includes(selectedId)) {
      if (isChecked) {
        // Retirer l'option si elle était cochée
        setOptionsLiees((prevOptionsLiees) =>
          prevOptionsLiees.filter(
            (option) =>
              prevOptionsLiees.filter((option) => option !== selectedId) !==
              selectedId
          )
        );
      } else {
        // Ajouter l'option si elle était décochée
        setOptionsLiees((prevOptionsLiees) => [
          ...prevOptionsLiees,
          selectedId,
        ]);
      }
    }
  };
  // fonction executée lors de la suppression d'une option dans la partie gauche
  const deleteRelation = (id_relvehiculeoption) => {
    dispatch(delRelVehOpt(id_relvehiculeoption))
      .then(async (response) => {
        // Mettez à jour le tableau optionsLiees et relations après la suppression
        const updatedData = await dispatch(listRelVehOpt({ data: IdVehicule }));

        if (updatedData.payload.okay !== "false") {
          const updatedRelations = updatedData.payload.data.map((item) => ({
            id_relvehiculeoption: item.id_relvehiculeoption,
            fk_vehicule: item.fk_vehicule,
            fk_option: item.fk_option,
          }));

          setRelations(updatedRelations);

          // Mettez à jour le tableau optionsLiees après la suppression
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
      {/* En-tête de la modale */}
      <div className="entetemodal">
        {/* titre de la modale */}
        <div className="titremodal">Options</div>
        {/* icones de la modale */}
        <CancelTwoToneIcon
          className="escape"
          sx={iconeStyle}
          onClick={onCancel}
        />
        {/* icones de la modale liée à un drapeau d'affichage */}
        {showAddButton && (
          <AddCircleTwoToneIcon
            className="ajout"
            sx={iconeStyle}
            onClick={ajoutRelVO}
          />
        )}

        {showSaveButton && (
          <SaveTwoToneIcon
            className="save"
            sx={iconeStyle}
            onClick={saveRelationOpt}
          />
        )}
      </div>
      {/* Corps de la modale */}
      <div className="corpsmodale">
        {/* Liste des équipements liés à ce vehicule ; à gauche du corps */}
        <div className="liste">
          <div className="titreliste">Options choisies</div>
          {optionsLiees.map((optiontId) => {
            const option = listeOption.find((p) => p.id_option === optiontId);
            // Obtenir la relation correspondant à l'option
            const relation = relations.find((r) => r.fk_option === optiontId);
            return (
              <div key={optiontId} className="itemlisteequip">
                <div>
                  {option && (
                    <div className="ajustitemliste">
                      <span>{option.Optionvehicule}</span>
                      <DeleteTwoToneIcon
                        sx={iconeStyleDelete}
                        onClick={() => {
                          if (relation && relation.id_relvehiculeoption) {
                            // Supprimer la relation de la base de données
                            deleteRelation(relation.id_relvehiculeoption, true);
                          } else {
                            // Supprimer l'équipement de equipementsLiees
                            setOptionsLiees((prevState) =>
                              prevState.filter((id) => id !== optiontId)
                            );
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Liste des options disponibles avec ajout d'une nouvelle option si besoin;  à droite du corps */}
        <div className="listeAjout">
          {ajoutOption && (
            <>
              {" "}
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  Height: "600px",
                  overflowY: "auto",
                }}
              >
                {optionsDisponiblesFiltrees.map((option) => (
                  <FormControlLabel
                    key={option.id_option}
                    control={
                      <Checkbox
                        checked={checkboxState[option.id_option] || false}
                        value={option.id_option}
                        onChange={handleCheckboxChange}
                        sx={prestaStyle}
                      />
                    }
                    label={option.Optionvehicule}
                    sx={{
                      ".MuiTypography-root": {
                        // Sélecteur spécifique pour le composant Typograph
                        fontSize: "10px",
                        borderBottom: "1px solid black", // Ajout de la bordure basse
                        paddingBottom: "5px", // Ajout de l'espacement en dessous
                        // Ajoutez d'autres styles personnalisés ici
                      },
                    }}
                  />
                ))}
              </FormGroup>
              {/* Ajout d'une nouvelle option */}
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
