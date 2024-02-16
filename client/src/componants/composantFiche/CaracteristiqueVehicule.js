import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchCaractById, resetCaracteristique } from '../../features/slice/caracteristiqueSlice';
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Dialog,
} from "@mui/material";
import ModaleCaracteristiqueVehicule from '../autres/ModaleCaracteristiqueVehicule';
// css dans fichier _fichevehicule.scss

const CaracteristiqueVehicule = () => {
  let id = useSelector((state) => state.vehicule.vehiculeEnCours);
  const dispatch = useDispatch();
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [flagEdit, setFlagEdit] = useState(false);
  const [flagCreation, setFlagCreation] = useState(false);
  //dispatch(resetCaracteristique());
  const caracteristique = useSelector(
    (state) => state.caracteristique.caracteristique
  ); // variable contenant les cartes des vehicules
  const [premierCaracteristique, setPremierCaracteristique] = useState(null);
  // Effect pour mettre à jour premierCaracteristique lorsque caracteristique est défini et a des éléments
  useEffect(() => {
    if (caracteristique && caracteristique.length > 0) {
      setPremierCaracteristique(caracteristique[0]);
    }
  }, [caracteristique]);
  // récupére les données dans la base de données, choix pour pouvoir tout gérer les modifs ou la création dans ce composant
  useEffect(() => {
    dispatch(fetchCaractById({ data: id }))
      .then((response) => {
        // Traitez la réponse ici
        if (response.payload.okay === "false") {
          // si le flag okay est faux c'est que la BD est vide ou qu'il n' y'a pas de données pour ce véhicule
          // Dans les 2 cas, on passe en mode création
          //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
          setHasLoadedData(true); // Marquer que les données ont été chargées pour autoriser l'affichage
          setFlagCreation(true);
        } else {
          // Les données sont valides
          setHasLoadedData(true); // Marquer que les données ont été chargées
          setFlagCreation(false);
          localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
          //setMessage(""); // effacer le message sinon réapparait
        }
      })
      .catch((error) => {
        // Traitez les erreurs ici
        setHasLoadedData(true); // Marquer que les données ont été chargées
      });
  }, [dispatch, id]);
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const modalStyleParten = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "400px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": { borderRadius: "20px" },
  };
  const {
    id_caracteristique = "",
    fk_vehicule = "",
    Provenance = "",
    Miseencirculation = "",
    Couleur = "",
    Nombreporte = "",
    Nombreplace = "",
    Longueur = "",
    Largeur = "",
    Volumecoffre = "",
    Puissancefiscale = "",
    Puissancemoteur = "",
  } = premierCaracteristique || {};
  const editCaractVehicule = () => {
    setFlagEdit(true);
  };
  const abordCaractVehicule = () => {
    console.log("AbordCaractVehicule")
    dispatch(fetchCaractById({ data: id }));
    setFlagEdit(false);

  };
  return (
    <div>
      <div className="titrecaracter">
        Caractéristiques
        <EditTwoToneIcon sx={iconeStyle} onClick={editCaractVehicule} />
      </div>
      <div className="donnéecaracter">
        <div>Provenance : {Provenance}</div>
        <div>Date de mise en circulation : {Miseencirculation}</div>
        <div>Couleur : {Couleur}</div>
        <div>Nombres de portes : {Nombreporte}</div>
        <div>Nombres de places : {Nombreplace} </div>
        <div>Longeur : {Longueur} </div>
        <div>Largeur: {Largeur} </div>
        <div className="separationcaract">
          Volume du coffre: {Volumecoffre}{" "}
        </div>
        <div>Puissance fiscale (Cv) : {Puissancefiscale} </div>
        <div>Puissances (DIN) : {Puissancemoteur} </div>
      </div>
      {flagEdit && (
        <Dialog open={true} sx={modalStyleParten}>
          <ModaleCaracteristiqueVehicule
            idvehicule={id}
            caracteristique={premierCaracteristique}
            flagCreation={flagCreation}
            onClose={abordCaractVehicule}
          />
        </Dialog>
      )}
    </div>
  );
};

export default CaracteristiqueVehicule