import React, { useEffect } from "react"; // chargement des composants react
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // chargement des fonction de gestion du store
//  import des composants react
import ModaleCaracteristiqueVehicule from "../autres/ModaleCaracteristiqueVehicule";
//  import des composants mui material
import { Dialog } from "@mui/material";
// import des icones mui material
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import des fonctions de gestion du store
import { fetchCaractById } from "../../features/slice/caracteristiqueSlice";

// css dans fichier _fichevehicule.scss
// composant d'affichage des caractéristiques d'un véhicule (pas de props passées)
const CaracteristiqueVehicule = () => {
  const dispatch = useDispatch(); // fonction d'appel des fonctions du store
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les icones de modification pour les personnes authorisées
  let id = useSelector((state) => state.vehicule.vehiculeEnCours); // récupére l'id du véhicule en cours d'affichage
  const [hasLoadedData, setHasLoadedData] = useState(false);// drapeau de chargement des données en provenance de la BD
  const [flagEdit, setFlagEdit] = useState(false); // drapeau d'affichage de la modale de modification des données du véhicule
  const [flagCreation, setFlagCreation] = useState(false);// drapeau d'affichage pour créer des caractéristiques
  const caracteristique = useSelector(
    (state) => state.caracteristique.caracteristique
  ); // variable contenant les caractéristiques du vehicule
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
  //definition du style de la modale de modification des données
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
    },
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
  } = premierCaracteristique || {}; // tableau contenant les données à afficher, vide au départ si pas de données dans la base ==> evite les erreurs d'affichage
// fonction d'ouverture de la modale de modification des données
  const editCaractVehicule = () => {
    setFlagEdit(true);
  };
// fonction de fermeture de la modale de modification des données
  const abordCaractVehicule = () => {
    dispatch(fetchCaractById({ data: id }));
    setFlagEdit(false);
  };
  return (
    <div>
      {/* Affichage du titre*/}
      <div className="titrecaracter">
        Caractéristiques
      {/* affichage de l'icone d'édition pour les personnes autorisées */}
        {authorized && (
          <EditTwoToneIcon sx={iconeStyle} onClick={editCaractVehicule} />
        )}
      </div>
      {/* Affichage des données */  }
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
      {/* Affichage de la modale de modification*/}
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
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

export default CaracteristiqueVehicule;
