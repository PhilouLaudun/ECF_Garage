import React, { useEffect, useState } from "react";// chargement des composants react
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store
//  import des composants react
import EquipementModale from "../autres/EquipementModale";
//  import des composants mui material
import { Dialog } from "@mui/material";
// import des icones mui material
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import des fonctions de gestion du store
import { fetchEquip } from "../../features/slice/equipementSlice";
import { listRelVehEquip } from "../../features/slice/relVehiculeEquipementSlice";
//
// composant d'affichage des equipements d'un véhicule (pas de props passées)
const EquipementVehicule = () => {
  const dispatch = useDispatch(); // fonction d'appel des fonctions du store
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les icones de modification pour les personnes authorisées
  let id_vehicule = useSelector((state) => state.vehicule.vehiculeEnCours); // récupére l'id du véhicule en cours d'affichage
  const [flagEdit, setFlagEdit] = useState(false); // drapeau d'affichage de la modale de modification des données du véhicule
  const [hasLoadedData, setHasLoadedData] = useState(false); // drapeau de chargement des données en provenance de la BD
  const listeEquipement = useSelector((state) => state.equipement.equipement); //variable contenant les équipements possibles
  const [equipementsLiees, setEquipementsLiees] = useState([]); // variable contenant les équipements du véhicules
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  //definition du style de la modale de modification des données
  const modalStyle = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "420px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": {
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.8)",
    },
    "@media (max-width: 420px)": {
      position: "absolute",
      top: "10%",
      left: "-13%",
      // Ajoutez d'autres styles selon vos besoins
    },
  };
  // useEffect déclenché lors du lancement de la page pour récuperer les données de la BD
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des equipements liés à un vehicule au départ
      if (!hasLoadedData) {
        // si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(
            listRelVehEquip({ data: id_vehicule })
          ); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedData(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides
              const res = response.payload.data;
              const nouvellesPrestationsLiees = res.map(
                (item) => item.fk_equipement
              );
              setEquipementsLiees(nouvellesPrestationsLiees);
              setHasLoadedData(true); // Marquer que les données ont été chargées
              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedData(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedData]);
  // fonction d'ouverture de la modale de modification des données
  const editEquipVehicule = () => {
    setFlagEdit(true);
  };
    // fonction de fermeture de la modale de modification des données
  const closeEquipVehicule = () => {
    dispatch(fetchEquip());// relance la recherche des équipement
    setFlagEdit(false);
    // Déclencher le rechargement des données après la fermeture de la modale
    updateEquipementsLiees();
  };
  // fonction de mise à jour des équipements liés à ce vehicule
  const updateEquipementsLiees = async () => {
    try {
      const response = await dispatch(listRelVehEquip({ data: id_vehicule }));
      if (response && response.payload.okay !== "false") {
        const res = response.payload.data;
        const nouvellesPrestationsLiees = res.map((item) => item.fk_equipement);
        setEquipementsLiees(nouvellesPrestationsLiees);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des équipements liés :",
        error
      );
      // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div>
      {/* Affichage du titre*/}
      <div className="titreequipement">
        Equipements
      {/* si personne autorisée affiche l'icone d'edition des données*/}
        {authorized && (
          <EditTwoToneIcon sx={iconeStyle} onClick={editEquipVehicule} />
        )}
      </div>
      {/* Affichage des données */}
      <div className="donnéeequipement">
        {/* si les données ont été chargées, on les affiche sinon on n'affiche rien*/}
        {hasLoadedData && (
          <>
            {equipementsLiees &&
              equipementsLiees.length > 0 &&
              equipementsLiees.map((equipementId) => {
                const equipement = listeEquipement.find(
                  (p) => p.id_equipement === equipementId
                );

                return (
                  <div key={equipementId} className="itemlistepresta">
                    <div>
                      {equipement && (
                        <div className="ajustitemliste">
                          <span>{equipement.Equipement}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      {/* Modale de modification ou de création des équipements*/}
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
          <EquipementModale
            onCancel={closeEquipVehicule}
            equipements={listeEquipement}
            idVehicule={id_vehicule}
          />
        </Dialog>
      )}
    </div>
  );
};

export default EquipementVehicule;
