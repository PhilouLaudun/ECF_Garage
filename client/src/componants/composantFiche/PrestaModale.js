import React, { useEffect, useState } from "react"; // import des fonctions de react
import { useDispatch, useSelector } from "react-redux";
// import des composants constituant la page
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { FormGroup, Checkbox, FormControlLabel, Dialog } from "@mui/material";
import CarteEmail from "./CarteEmail";
import {
  createRelStructPresta,
  deleteRelStructPresta,
  listStructPresta,
} from "../../features/slice/relStructPrestaSlice";

export const PrestaModale = (props) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const IdStructure = props.numerocarte; //  récupére l'id de la structure
  var onCancel = props.onCancel; //  props contenant la fonction d'effacement de la modale
  const [checkboxState, setCheckboxState] = useState({}); // État pour les cases à cocher
  const [ajoutPretat, setAjoutPretat] = useState(false); //
  const listePrestation = useSelector((state) => state.prestation.prestations); // ensemble des prestations disponibles
  const [prestationsLiees, setPrestationsLiees] = useState([]); // Remplacez par les prestations déjà liées
  const [relations, setRelations] = useState([]); // Ajoutez cet état pour stocker les relations
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [nouvellesPrestationsLiees, setNouvellesPrestationsLiees] = useState(
    []
  );
  //const [nouvellesPrestations, setNouvellesPrestations] = useState([]); // Nouvelle variable d'état pour les nouvelles prestations liées
  //const [prestationsDisponibles, setPrestationsDisponibles] =useState(listePrestation); // Remplacez par l'ensemble des prestations disponibles

  const [hasLoadedDataRelStructPresta, setHasLoadedDataRelStructPresta] =
    useState(false); // n'est pas gérer de la même manière que dans le composant partenaire
  const [message, setMessage] = useState(""); //  message de retour de  la base de données en cas d'erreur ou si elle est vide
  //const listePrestation = useSelector((state) => state.partenaire.partenaire); // variable contenant les cartes des prestataires
  // definition du style des composants icones de sauvegarde, annulation et fermeture
  const [flagEmail, setflagEmail] = useState(false);
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
    const modalStyleParten = {
      zIndex: 20,
      position: "absolute",
      margin: "auto",
      display: "flex",
      height: "900px",
      width: "400px",
      "& .MuiPaper-root": { background: "transparent", borderRadius: "20px" },
      "& .MuiDialog-paper": { background: "transparent", borderRadius: "20px" },
    };
  useEffect(
    () => {
      if (IdStructure) {
        dispatch(listStructPresta({ data: IdStructure }))
          .then((response) => {
            const res = response.payload.data;
            const nouvellesPrestationsLiees = res.map(
              (item) => item.fk_prestation
            );
            setPrestationsLiees(nouvellesPrestationsLiees);
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    },
    [dispatch,
    IdStructure]
  );
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des structures liées à un partenaire
      if (!hasLoadedDataRelStructPresta) {
        //si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(
            listStructPresta({ data: IdStructure })
          ); // appel du slice de chargement des données auprés de la BD pour un partenaire donné
          if (response) {
            //si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide ou qu'il n'y a pas de structure pour ce partenaire,  on à prévu un flag "vide" pour gérer le cas de la base vide pour l'heure on gére les 2 cas de la même manière, a savoir l'affichage du message renvoyé par le controller du serveur
              // Gérer le cas où la table est vide ou pas de structure pour le partenaire donné
              setMessage(response.payload.message); //récupère le message renvoyé par le serveur (base vide ou structure absente)
              setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
            } else {
              const relations = response.payload.data.map((item) => ({
                id_relStructPresta: item.id_relStructPresta,
                fk_structure: item.fk_structure,
                fk_prestation: item.fk_prestation, // Ajout de l'identifiant de relation
              }));
              setRelations(relations); // Mettez à jour les relations
              setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
              setMessage(""); // effacer le message sinon réapparait
              dispatch(listePrestation()); // charge la liste des prestations pour  l'utiliser dans les cartes
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataRelStructPresta(true); // Marquer que les données ont été chargées
          setMessage(
            "Une erreur est survenue lors de la recherche des structures."
          );
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataRelStructPresta, IdStructure]);
  //
  // filtre les prestations pour n'afficher que celles qui manquent
  const prestationsDisponiblesFiltrees = listePrestation.filter(
    (prestation) => !prestationsLiees.includes(prestation.id_prestation)
  );
  // fonction d'affichage de la partie de saisie des nouvelles prestations à reliée
  const ajoutPrestation = () => {
    setAjoutPretat(true); // affiche la zone des prestations pouvant etre reliées
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowAddButton(false); // desaffiche l'icone d'ajout
  };
  // fonction de sauvegarde des nouvelles prestations à reliées à la structure
  const saveRelation = async () => {
    setAjoutPretat(false);
    setShowSaveButton(false);
    setShowAddButton(true);
    try {
      await dispatch(
        createRelStructPresta({
          structureId: IdStructure,
          prestationIds: nouvellesPrestationsLiees,
        })
      );

      // Après la sauvegarde, mettez à jour les états nécessaires
      const response = await dispatch(listStructPresta({ data: IdStructure }));
      console.log("response .payload.data", response.payload.data);
      const updatedRelations = response.payload.data.map((item) => ({
        id_relStructPresta: item.id_relStructPresta,
        fk_structure: item.fk_structure,
        fk_prestation: item.fk_prestation,
      }));
      setRelations(updatedRelations);

      // Mettez à jour le tableau prestationsLiees après la sauvegarde
      const updatedPrestationsLiees = response.payload.data.map(
        (item) => item.fk_prestation
      );
      setPrestationsLiees(updatedPrestationsLiees);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
          setflagEmail(true);
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
    const estDejaLiee = prestationsLiees.includes(selectedId);

    if (!estDejaLiee) {
      // Mettez à jour les nouvelles prestations à lier
      setNouvellesPrestationsLiees((prevPrestations) => {
        setShowSaveButton(true); // Affiche le bouton après l'ajout d'une prestation

        if (isChecked) {
          // Retirer la prestation si elle était cochée
          return prevPrestations.filter(
            (prestation) => prestation !== selectedId
          );
        } else {
          // Ajouter la prestation si elle était décochée
          return [...prevPrestations, selectedId];
        }
      });
    }

    if (!prestationsLiees.includes(selectedId)) {
      if (isChecked) {
        // Retirer la prestation si elle était cochée
        setPrestationsLiees((prevPrestationsLiees) =>
          prevPrestationsLiees.filter((prestation) => prestation !== selectedId)
        );
      } else {
        // Ajouter la prestation si elle était décochée
        setPrestationsLiees((prevPrestationsLiees) => [
          ...prevPrestationsLiees,
          selectedId,
        ]);
      }
    }
  };
  const deleteRelation = (id_relStructPresta) => {
    dispatch(deleteRelStructPresta(id_relStructPresta))
      .then(async (response) => {
        // Mettez à jour le tableau prestationsLiees et relations après la suppression
        const updatedData = await dispatch(
          listStructPresta({ data: IdStructure })
        );

        if (updatedData.payload.okay !== "false") {
          const updatedRelations = updatedData.payload.data.map((item) => ({
            id_relStructPresta: item.id_relStructPresta,
            fk_structure: item.fk_structure,
            fk_prestation: item.fk_prestation,
          }));

          setRelations(updatedRelations);

          // Mettez à jour le tableau prestationsLiees après la suppression
          const updatedPrestationsLiees = updatedData.payload.data.map(
            (item) => item.fk_prestation
          );
          setPrestationsLiees(updatedPrestationsLiees);
        }
      })

      .catch((error) => {
        console.error(
          "Erreur lors de la simulation de la suppression :",
          error
        );
      });
    setflagEmail(true);
  };
    const abordSendEmail = () => {
      setflagEmail(false);
    };
  return (
    <main className="contentModalePresta">
      <div className="entetemodalpresta">
        <div className="titremodalpresta">Prestations</div>
        <CancelTwoToneIcon
          className="escape"
          sx={iconeStyle}
          onDoubleClick={onCancel}
        />
        {showAddButton && (
          <AddCircleTwoToneIcon
            className="ajoutpresta"
            sx={iconeStyle}
            onClick={ajoutPrestation}
          />
        )}

        {showSaveButton && (
          <SaveTwoToneIcon
            className="savepresta"
            sx={iconeStyle}
            onClick={saveRelation}
          />
        )}
      </div>
      <div className="corpsmodalePresta">
        <div className="listePresta">
          <div className="titreliste">Prestations choisies</div>
          {prestationsLiees.map((prestationId) => {
            const prestation = listePrestation.find(
              (p) => p.id_prestation === prestationId
            );
            // Obtenir la relation correspondant à la prestation
            const relation = relations.find(
              (r) => r.fk_prestation === prestationId
            );
            return (
              <div key={prestationId} className="itemlistepresta">
                <div>
                  {prestation && (
                    <div className="ajustitemliste">
                      <span>{prestation.Nom}</span>
                      <DeleteTwoToneIcon
                        sx={iconeStyleDelete}
                        onDoubleClick={() =>
                          deleteRelation(relation.id_relStructPresta)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="listeAjoutPresta">
          {ajoutPretat && (
            <FormGroup>
              {prestationsDisponiblesFiltrees.map((prestation) => (
                <FormControlLabel
                  key={prestation.id_prestation}
                  sx={prestaStyle}
                  control={
                    <Checkbox
                      checked={checkboxState[prestation.id_prestation] || false}
                      onChange={handleCheckboxChange}
                      value={prestation.id_prestation}
                    />
                  }
                  label={prestation.Nom}
                />
              ))}
            </FormGroup>
          )}
        </div>
      </div>
      {flagEmail && (
        <Dialog open={true} sx={modalStyleParten}>
          <CarteEmail onCancel={abordSendEmail} />
        </Dialog>
      )}
    </main>
  );
};

export default PrestaModale;
