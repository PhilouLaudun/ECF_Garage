import React, { useEffect } from "react"; // chargement des composants react
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // chargement des fonction de gestion du store
// import des composants de la page
import SyntheseModale from "./SyntheseModale";
import CarteEmail from "../autres/CarteEmail";
// import des composants mui material
import { Dialog } from "@mui/material";
// import des icones mui material
import EmailIcon from "@mui/icons-material/Email";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import des fonctions de gestion du store
import { listVehicule } from "../../features/slice/vehiculeSlice";
// css dans fichier _fichevehicule.scss
// composant d'affichage de la synthése d'un véhicule (pas de props passées)
const SyntheseVehicule = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les icones de modification pour les personnes authorisées
  const dispatch = useDispatch(); // fonction d'appel des fonctions du store
  let id = useSelector((state) => state.vehicule.vehiculeEnCours); // récupére l'id du véhicule en cours d'affichage
  const vehicules = useSelector((state) => state.vehicule.vehicule); // récupère la liste des vehicules
  const [vehicule, setVehicule] = useState(
    vehicules.find((v) => v.id_vehicule === id)
  ); // Initialise vehicule avec les données du véhicule à afficher
  const [flagEdit, setFlagEdit] = useState(false); // drapeau d'affichage de la modale de modification des données du véhicule
  const [flagMail, setFlagMail] = useState(false); // drapeau d'affichage de la modale d'envoi de mail
  // style des icones sauvegarde et annulation
  const iconeStyle = {
    fontSize: "35px",
    marginLeft: "40px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // style de la modale de modification des données du vehicule
  const modalStyle = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "450px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": {
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.8)",
    },
    "@media (max-width: 420px)": {
      position: "absolute",
      top: "10%",
      left: "-25px",
      // Ajoutez d'autres styles selon vos besoins
    },
  };
  // useEffect utilisée quand on modifie le vehicule
  useEffect(() => {
    // Mettre à jour vehicule lorsque vehicules est mis à jour
    const selectedVehicule = vehicules.find((v) => v.id_vehicule === id);
    setVehicule(selectedVehicule);
  }, [vehicules, id]);
  // charge les données du vehicule pour l'affichage
  const {
    Marque,
    Modele,
    Modeleprecis,
    Annee,
    Kilometrage,
    Energie,
    Transmission,
    UrlPhoto,
    Prix,
  } = vehicule;
  let objetMessages = Marque + "  -  " + Modele + " - " + Modeleprecis; // création des lignes d'affichage
  // fonction d'affichage de la modale de modification des données de synthése du vehicule
  const editSyntheseVehicule = () => {
    setFlagEdit(true);
  };
  // fonction de fermeture de la modale de modification des données de synthése du vehicule
  const closeSyntheseVehicule = () => {
    dispatch(listVehicule); // remet la liste des données des véhicules à jour
    setFlagEdit(false);
  };
  // fonction d'affichage de la modale d'envoi des mails
  const sendEmail = () => {
    setFlagMail(true);
  };
  // fonction de fermeture de la modale d'envoi des mails
  const closeEmail = () => {
    setFlagMail(false);
  };
  return (
    <div className="cartesynthese">
      {/* affichage du titre */}
      <div className="titresynthese">
        <div>
          {Marque} {Modele}
        </div>
        {/*si autorisé, affiche l'icone d'édition */}
        {authorized && (
          <EditTwoToneIcon sx={iconeStyle} onClick={editSyntheseVehicule} />
        )}
      </div>
      {/* affichage du modéle */}
      <div className="precisionmodele">{Modeleprecis} </div>
      {/* affichage des infos de synthése */}
      <div className="infosynthese">
        {Annee} | {Kilometrage} Km | {Transmission} | {Energie}
      </div>
      {/* affichage du prix */}
      <div className="prixsynthese">{Prix}€</div>
      {/* affichage du bouton d'envoi de mail */}
      <div className="containerboutonmail">
        { /* si c'est un visiteur on autorise l'envoi d'un mail */}
        {!authorized && (
          <button className="boutonsynthese">
            <EmailIcon onClick={sendEmail} />
          </button>
        )}
      </div>
      {/* affichage de la modale de modification des données de synthése*/}
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
          <SyntheseModale vehicule={vehicule} onClose={closeSyntheseVehicule} />
        </Dialog>
      )}
      {/* affichage de la modale d'envoi d'un mail*/}
      {flagMail && (
        <Dialog open={true} sx={modalStyle}>
          <CarteEmail onClose={closeEmail} objetDemandeprops={objetMessages} />
        </Dialog>
      )}
    </div>
  );
};

export default SyntheseVehicule;
