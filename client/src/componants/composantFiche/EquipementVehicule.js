import React, { useEffect, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Dialog } from "@mui/material";
import EquipementModale from "../autres/EquipementModale";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquip } from "../../features/slice/equipementSlice";
import { listRelVehEquip } from "../../features/slice/relVehiculeEquipementSlice";

const EquipementVehicule = () => {
  let id_vehicule = useSelector((state) => state.vehicule.vehiculeEnCours);
  const [flagEdit, setFlagEdit] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const listeEquipement = useSelector((state) => state.equipement.equipement);
  const [equipementsLiees, setEquipementsLiees] = useState([]);
  const dispatch = useDispatch();
  // charge les données depuis le store à propos des vehicules et le tableau sera mis à jour à chaque changement du store.
  //const listeEquipements = useSelector((state) => state.equipement.equipement); // variable contenant les cartes des vehicules
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const modalStyle = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "400px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": { borderRadius: "20px" },
  };
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


  const editEquipVehicule = () => {
    setFlagEdit(true);
  };
  const closeEquipVehicule = () => {
  dispatch(fetchEquip());
  setFlagEdit(false);

  // Déclencher le rechargement des données après la fermeture de la modale
  updateEquipementsLiees();
  };
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
  /*<div>Bluetooth</div>
        <div>Régulateur de vitesse</div>
        <div>Direction assistée</div>
        <div>Fermeture électrique automatique</div>
        <div>Vitres électriques</div>
        <div>Volant multifonctions</div>
        <div>Régulateur limiteur de vitesse</div>
        <div>GPS</div>
        <div>Écran tactile</div>
        <div>ABSESP</div>
        <div>Aide au démarrage en côte</div>
        <div>AFU</div>
        <div>Projecteurs antibrouillard</div>
        <div>Détecteur de pluie</div>
        <div>Feux automatiques</div>
        <div>accoudoir central</div>
      </div>*/
  return (
    <div>
      <div className="titreequipement">
        Equipements
        <EditTwoToneIcon sx={iconeStyle} onClick={editEquipVehicule} />
      </div>
      <div className="donnéeequipement">
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
