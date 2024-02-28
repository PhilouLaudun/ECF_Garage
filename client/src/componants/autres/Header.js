import React, { useState } from "react";// chargement des composants react
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store 
// import composants react
import Navigation from "./Navigation";
import Carteconnection from "./Carteconnexion";
import CarteAgentModale from "../agents/CarteAgentModale";
// import composants mui material
import {Dialog } from "@mui/material"; // import du composant Dialog pour  afficher la modale et des composants pour l'affichage de l'attente du chargement
// import des icones mui material
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
// import des styles css exportés
import couleurssass from "../../styles/_settings.scss"; // import des variables définies dans le fichier scss (index.scss) couleur icone pour la couleur de la carte
// import des fonctions de gestion du store
import { resetUtilisateur } from "../../features/slice/loginSlice";
//
//page Header (pas de props passées)
const Header = () => {
  const dispatch = useDispatch(); // fonction d'envoi des données vers les slices du store
  // style des icones de login ou delogin
  const iconeconnexionStyles = {
    color: couleurssass.iconescss,
    fontSize: "40px",
    "&:hover": {
      color: "green", // Changer la couleur au survol
    },
  };
  // style de la modale de saisie des login et mot de passe
  const modalStyle = {
    zIndex: 200,
    position: "absolute",
    top: "25%",
    left: "28%",
    display: "flex",
    height: "400px",
    width: "400px",
    "& .MuiPaper-root": { background: "transparent", borderRadius: "20px" },
    "& .MuiDialog-paper": { background: "transparent", borderRadius: "20px" },
    "@media (max-width: 420px)": {
      position: "absolute",
      top: "10%",
      left: "-5%",
      // Ajoutez d'autres styles selon vos besoins
    },
  };

  const autorised = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les options des gens habilités aux fonctions reserveés au personnel du garage
  const utilisateur = useSelector((state) => state.utilisateur.nom); // chargement du nom de l'utilidsateur identifié
  const role = useSelector((state) => state.utilisateur.role); // role de la personne identifiée : admin ou consultant
  const [flagModaleAgent, setFlagModaleAgent] = useState(false); // drapeau de gestion de la gestion des agents
  const [loginApp, setLoginApp] = useState(false); // drapeau de gestion de la présence des icones fonction de la personne identifiée
  // fonction d'ouverture de la modale de connexion de l'utilisateur
  const logApp = () => {
    setLoginApp(true);
  };
  // fonction de fermeture de la modale de connexion de l'utilisateur
  const abordLogin = () => {
    setLoginApp(false);
  };
  // fonction de déconnexion, vide le store utilisateur
  const leaveApp = () => {
    dispatch(resetUtilisateur());
  };
  // fonction d'ouverture de la modale de gestion des utilisateurs
  const gestionAgent = () => {
    setFlagModaleAgent(true);
  };
  // fonction de fermeture de la modale de gestion des utilisateurs
  const closeGestionAgent = () => {
    setFlagModaleAgent(false);
  };

  return (
    <main className="mainheader">
      <div className="containeurheader">
        {/* Logo */}
        <div className="logoheader">
          <img src="/assets/img/LogoGarageParrot.jpg" alt="Logo" />
        </div>

        <div className="navheader">
          <Navigation></Navigation>
        </div>
                     {/* Titre */}
        <div className="titreheader">
          <div className="titreh">Garage V. PARROT</div>
        </div>
        {/* Icones de login, gestion des comptes, nom utilisateur et logout*/}
        <div className="iconeheader">
          {/* si autorisé on affiche le nom de l'utilisateur et l'icone logout et si le rele est un admin on affiche l'icone de gestion des utilisateurs sinon par défaut c'est l'icone login qui est affichée */}
          {autorised ? (
            <>
              <div className="nomutilisateur">
                {utilisateur}{" "}
                {role === 1 && (
                  <GroupIcon sx={iconeconnexionStyles} onClick={gestionAgent} />
                )}
              </div>

              <LogoutIcon sx={iconeconnexionStyles} onClick={leaveApp} />
            </>
          ) : (
            <LoginIcon sx={iconeconnexionStyles} onClick={logApp} />
          )}
        </div>
        {/* modale de saisie du login*/}
        {loginApp && (
          <Dialog open={true} sx={modalStyle}>
            <Carteconnection onCancel={abordLogin} />
          </Dialog>
        )}
      </div>
      {/* modale de saisie des agents*/}
      {flagModaleAgent && (
        <Dialog open={true} sx={modalStyle}>
          <CarteAgentModale onCancel={closeGestionAgent} />
        </Dialog>
      )}
    </main>
  );
};

export default Header;
