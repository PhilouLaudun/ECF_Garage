import React, { useEffect, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Dialog } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

import { listRelVehOpt } from "../../features/slice/relVehiculeOptionSlice";
import { fetchOpt } from "../../features/slice/optionSlice";
import OptionModale from "./OptionModale";

const OptionVehicule = () => {
    const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  let id_vehicule = useSelector((state) => state.vehicule.vehiculeEnCours);
  const [flagEdit, setFlagEdit] = useState(false);
  const [hasLoadedDataOpt, setHasLoadedDataOpt] = useState(false);
  const listeOption = useSelector((state) => state.option.option);
  const [optionsLiees, setOptionsLiees] = useState([]);
  const dispatch = useDispatch();

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
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des equipements liés à un vehicule au départ
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
  const editOptionVehicule = () => {
    setFlagEdit(true);
  };
  const closeOptVehicule = () => {
    dispatch(fetchOpt());
    setFlagEdit(false);

    // Déclencher le rechargement des données après la fermeture de la modale
    updateOptionsLiees();
  };
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
        "Erreur lors de la mise à jour des équipements liés :",
        error
      );
      // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div>
      <div className="titreoption">
        Options
        { authorized && (<EditTwoToneIcon sx={iconeStyle} onClick={editOptionVehicule} />)}
        
      </div>
      <div className="donnéeoption">
        {" "}
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
