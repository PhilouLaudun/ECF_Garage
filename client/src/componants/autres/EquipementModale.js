import React, { useEffect, useState } from "react"; // import des fonctions de react
import { useDispatch, useSelector } from "react-redux";// chargement des fonctions de gestion du store
//  import des composants react
import NewEquipement from "../composantFiche/NewEquipement";
// import des composants mui material
import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
// import des fonctions de gestion du store
import { createRelVehEquip, deleteRelVelVehEquip, listRelVehEquip } from "../../features/slice/relVehiculeEquipementSlice";
import { fetchEquip } from "../../features/slice/equipementSlice";
//
//composant EquipementModale pour la modification des données caractéristiques d'un véhicule (props passées : onCancel: focntion callback lors de la fermeture de la modale/ idVehicule : id du véhicule concerné)
export const EquipementModale = (props) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const IdVehicule = props.idVehicule; //  récupére l'id du vehicule
  var onCancel = props.onCancel; //  props contenant la fonction d'effacement de la modale
  const [checkboxState, setCheckboxState] = useState({}); // État pour les cases à cocher
  const [ajoutEquip, setAjoutEquip] = useState(false); // flag d'ajout d'un equipement
  const listeEquipement = useSelector((state) => state.equipement.equipement); // ensemble des equipements disponibles
  const [equipementsLiees, setEquipementsLiees] = useState([]); // Remplacez par les prestations déjà liées
  const [relations, setRelations] = useState([]); // Ajoutez cet état pour stocker les relations
  const [showSaveButton, setShowSaveButton] = useState(false); // flag d'affichage de l'icone de sauvegarde
  const [showAddButton, setShowAddButton] = useState(true); // flag d'affichage de l'icone d'edition
  const [nouveauxEquipementsLiees, setNouveauxEquipementsLiees] = useState([]); // tableau contenant les nouveaux équipements du véhicule
  /*const [nouveauxEquipements, setNouveauxEquipements] = useState([]); // Nouvelle variable d'état pour les nouvelles prestations liées
  const [equipementsDisponibles, setEquipementsDisponibles] =
    useState(listeEquipement); // Remplacez par l'ensemble des prestations disponibles*/

  const [hasLoadedDataRelVehEquip, setHasLoadedDataRelVehEquip] =
    useState(false); // n'est pas gérer de la même manière que dans le composant partenaire
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
// definition du style de l'icone de suppression  d'un equipements liée
  const iconeStyleDelete = {
    fontSize: "15px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // definition du style de l'icone de coche des equipements à lier
  const prestaStyle = {
    //fontSize: "10px",
    "& .MuiSvgIcon-root": { fontSize: 13 },
    "& .MuiTypography-body1": { fontSize: 13 },
  };
  // useEffect si véhicule existe, charge les données à partir de le BD
  useEffect(() => {
    if (IdVehicule) {
      dispatch(listRelVehEquip({ data: IdVehicule }))
        .then((response) => {
          const res = response.payload.data;
          if (res && res.length > 0) {
            const nouveauxEquipementLiees = res.map(
              (item) => item.fk_equipement
            );
            setEquipementsLiees(nouveauxEquipementLiees);
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [dispatch, IdVehicule]);
  // useEffect de chargement des équipements liés à un vehicule
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des equipements liées à un véhicule
      if (!hasLoadedDataRelVehEquip) {
        //si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(
            listRelVehEquip({ data: IdVehicule })
          ); // appel du slice de chargement des données auprés de la BD pour un vehicule donné
          if (response) {
            //si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide ou qu'il n'y a pas d'equipement pour ce vehicule,  on à prévu un flag "vide" pour gérer le cas de la base vide pour l'heure on gére les 2 cas de la même manière, a savoir l'affichage du message renvoyé par le controller du serveur
              // Gérer le cas où la table est vide ou pas de structure pour le partenaire donné
              //setMessage(response.payload.message); //récupère le message renvoyé par le serveur (base vide ou structure absente)
              setHasLoadedDataRelVehEquip(true); // Marquer que les données ont été chargées
            } else {
              // on charge le tableau des relations avec le données de la base de données
              const relations = response.payload.data.map((item) => ({
                id_relVehiculeEquipement: item.id_relVehiculeEquipement,
                fk_vehicule: item.fk_vehicule,
                fk_equipement: item.fk_equipement, // Ajout de l'identifiant de relation
              }));
              setRelations(relations); // Mettez à jour les relations
              setHasLoadedDataRelVehEquip(true); // Marquer que les données ont été chargées
              //setMessage(""); // effacer le message sinon réapparait
              dispatch(fetchEquip()); // charge la liste des prestations pour  l'utiliser dans les cartes
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataRelVehEquip(true); // Marquer que les données ont été chargées
          /*setMessage(
            "Une erreur est survenue lors de la recherche des structures."
          );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataRelVehEquip, IdVehicule]);
  //
  // filtre les équipement pour n'afficher que ceux qui manquent
  const equipementsDisponiblesFiltrees = listeEquipement.filter(
    (equipement) => !equipementsLiees.includes(equipement.id_equipement)
  );
  // fonction d'affichage de la partie de saisie des nouveaux équipements à reliée
  const ajoutRelVE = () => {
    setAjoutEquip(true); // affiche la zone des équipement pouvant etre reliés
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowAddButton(false); // desaffiche l'icone d'ajout
  };
  // fonction de sauvegarde des nouveaux équipements à reliées au vehicule
  const saveRelationEquip = async () => {
    setAjoutEquip(false);
    setShowSaveButton(false);
    setShowAddButton(true);
    try {
      await dispatch(
        createRelVehEquip({
          vehiculeId: IdVehicule,
          equipementsIds: nouveauxEquipementsLiees,
        })
      );

      // Après la sauvegarde, mettez à jour les états nécessaires
      const response = await dispatch(listRelVehEquip({ data: IdVehicule }));
      console.log("response .payload.data", response.payload.data);
      const updatedRelations = response.payload.data.map((item) => ({
        id_relVehiculeEquipement: item.id_relVehiculeEquipement,
        fk_vehicule: item.fk_vehicule,
        fk_equipement: item.fk_equipement,
      }));
      setRelations(updatedRelations);

      // Mettez à jour le tableau EquipementsLiees après la sauvegarde
      const updatedPrestationsLiees = response.payload.data.map(
        (item) => item.fk_equipement
      );
      setEquipementsLiees(updatedPrestationsLiees);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };
  // fonction executée lors du cochage d'un équipement dans la partie droite
  const handleCheckboxChange = (event) => {
    const selectedId = Number(event.target.value);
    const isChecked = checkboxState[selectedId];
    setCheckboxState((prevState) => ({
      ...prevState,
      [selectedId]: !isChecked,
    }));
    // Vérifiez si la prestation est déjà liée
    const estDejaLiee = equipementsLiees.includes(selectedId);

    if (!estDejaLiee) {
      // Mettez à jour les nouveaux équipements à lier
      setNouveauxEquipementsLiees((prevEquipements) => {
        setShowSaveButton(true); // Affiche le bouton après l'ajout d'une prestation

        if (isChecked) {
          // Retirer l'équipement si il était cochée
          return prevEquipements.filter(
            (equipement) => equipement !== selectedId
          );
        } else {
          // Ajouter l'équipement si il était décochée
          return [...prevEquipements, selectedId];
        }
      });
    }

    if (!equipementsLiees.includes(selectedId)) {
      if (isChecked) {
        // Retirer la prestation si elle était cochée
        setEquipementsLiees((prevEquipementsLiees) =>
          prevEquipementsLiees.filter(
            (equipement) =>
              prevEquipementsLiees.filter(
                (equipement) => equipement !== selectedId
              ) !== selectedId
          )
        );
      } else {
        // Ajouter la prestation si elle était décochée
        setEquipementsLiees((prevEquipementsLiees) => [
          ...prevEquipementsLiees,
          selectedId,
        ]);
      }
    }
  };
  // fonction executée lors de la suppression d'un équipement dans la partie gauche
  const deleteRelation = (id_relVehiculeEquipement) => {
    dispatch(deleteRelVelVehEquip(id_relVehiculeEquipement))
      .then(async (response) => {
        // Mettez à jour le tableau equipementsLiees et relations après la suppression
        const updatedData = await dispatch(
          listRelVehEquip({ data: IdVehicule })
        );

        if (updatedData.payload.okay !== "false") {
          const updatedRelations = updatedData.payload.data.map((item) => ({
            id_relVehiculeEquipement: item.id_relVehiculeEquipement,
            fk_vehicule: item.fk_vehicule,
            fk_equipement: item.fk_equipement,
          }));

          setRelations(updatedRelations);

          // Mettez à jour le tableau equipementsLiees après la suppression
          const updatedPrestationsLiees = updatedData.payload.data.map(
            (item) => item.fk_equipement
          );
          setEquipementsLiees(updatedPrestationsLiees);
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
        <div className="titremodal">Equipements</div>
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
      {/* Corps de la modale */}
      <div className="corpsmodale">
        {/* Liste des équipements liés à ce vehicule ; à gauche du corps */}
        <div className="liste">
          <div className="titreliste">Equipements choisies</div>
          {equipementsLiees.map((equipementId) => {
            const equipement = listeEquipement.find(
              (p) => p.id_equipement === equipementId
            );
            // Obtenir la relation correspondant à l'équipement'
            const relation = relations.find(
              (r) => r.fk_equipement === equipementId
            );
            return (
              <div key={equipementId} className="itemlistepresta">
                <div>
                  {equipement && (
                    <div className="ajustitemliste">
                      <span>{equipement.Equipement}</span>
                      <DeleteTwoToneIcon
                        sx={iconeStyleDelete}
                        onDoubleClick={() =>
                          deleteRelation(relation.id_relvehiculeequipement)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Liste des équipements disponibles avec ajout d'un noiuvel équipement si besoin;  à droite du corps */}
        <div className="listeAjout">
          {ajoutEquip && (
            <>
              {" "}
              <FormGroup>
                {equipementsDisponiblesFiltrees.map((equipement) => (
                  <FormControlLabel
                    key={equipement.id_equipement}
                    sx={prestaStyle}
                    control={
                      <Checkbox
                        checked={
                          checkboxState[equipement.id_equipement] || false
                        }
                        value={equipement.id_equipement}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={equipement.Equipement}
                  />
                ))}
              </FormGroup>
              {/* Ajout d'un nouvel équipement */}
              <div className="AjoutNouvelEquipement">
                <NewEquipement />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default EquipementModale;
