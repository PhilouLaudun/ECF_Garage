import React, { useEffect, useState } from "react";// chargement des composants react
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store
//  import des composants react
import OptionModale from "./OptionModale";
//  import des composants mui material
import { Dialog } from "@mui/material"
// import des icones mui material
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import des fonctions de gestion du store
import { listRelVehOpt } from "../../features/slice/relVehiculeOptionSlice";
import { fetchOpt } from "../../features/slice/optionSlice";
//
// composant d'affichage des options d'un véhicule (pas de props passées)
const OptionVehicule = () => {
  const dispatch = useDispatch(); // fonction d'appel des fonctions du store
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les icones de modification pour les personnes authorisées
  let id_vehicule = useSelector((state) => state.vehicule.vehiculeEnCours); // récupére l'id du véhicule en cours d'affichage
  const [flagEdit, setFlagEdit] = useState(false); // drapeau d'affichage de la modale de modification des données du véhicule
  const [hasLoadedDataOpt, setHasLoadedDataOpt] = useState(false); // drapeau de chargement des données en provenance de la BD
  const listeOption = useSelector((state) => state.option.option); //variable contenant les options possibles
  const [optionsLiees, setOptionsLiees] = useState([]); // variable contenant les options du véhicules
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
      // fonction de chargement des options liés à un vehicule au départ
      if (!hasLoadedDataOpt) {
        // si les données n'ont pas été chargé
        try {
          //alors on charge les données
          const response = await dispatch(listRelVehOpt({ data: id_vehicule })); // appel du slice de chargement des données auprés de la BD;

          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedDataOpt(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides
              const res = response.payload.data;
              const nouvellesPrestationsLiees = res.map(
                (item) => item.fk_option
              );
              setOptionsLiees(nouvellesPrestationsLiees);
              setHasLoadedDataOpt(true); // Marquer que les données ont été chargées
              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataOpt(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataOpt]);
  // fonction d'ouverture de la modale de modification des données
  const editOptionVehicule = () => {
    setFlagEdit(true);
  };
  // fonction de fermeture de la modale de modification des données
  const closeOptVehicule = () => {
    dispatch(fetchOpt());
    setFlagEdit(false);
    // Déclencher le rechargement des données après la fermeture de la modale
    updateOptionsLiees();
  };
  // fonction de mise à jour des équipements liés à ce vehicule
  const updateOptionsLiees = async () => {
    try {
      const response = await dispatch(listRelVehOpt({ data: id_vehicule }));
      if (response && response.payload.okay !== "false") {
        const res = response.payload.data;
        const nouvellesPrestationsLiees = res.map((item) => item.fk_option);
        setOptionsLiees(nouvellesPrestationsLiees);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des options liées :",
        error
      );
      // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div>
      {/* Affichage du titre*/}
      <div className="titreoption">
        Options
        {/* si personne autorisée affiche l'icone d'edition des données*/}
        {authorized && (
          <EditTwoToneIcon sx={iconeStyle} onClick={editOptionVehicule} />
        )}
      </div>
      {/* Affichage des données */}
      <div className="donnéeoption">
        {/* si les données ont été chargées, on les affiche sinon on n'affiche rien*/}
        {hasLoadedDataOpt && (
          <>
            {optionsLiees &&
              optionsLiees.length > 0 &&
              optionsLiees.map((optionId) => {
                const option = listeOption.find(
                  (p) => p.id_option === optionId
                );

                return (
                  <div key={optionId} className="itemlistepresta">
                    <div>
                      {option && (
                        <div className="ajustitemliste">
                          <span>{option.Optionvehicule}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      {/* Modale de modification ou de création des options*/}
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
          <OptionModale
            onCancel={closeOptVehicule}
            options={listeOption}
            idVehicule={id_vehicule}
          />
        </Dialog>
      )}
    </div>
  );
};

export default OptionVehicule;
