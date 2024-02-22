import React, { useState } from "react";
import Navigation from "./Navigation";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import Carteconnection from "./Carteconnexion";
import CarteAgentModale from "../agents/CarteAgentModale";
import { Box, CircularProgress, Dialog } from "@mui/material"; // import du composant Dialog pour  afficher la modale et des composants pour l'affichage de l'attente du chargement
import couleurssass from "../../styles/_settings.scss"; // import des variables définies dans le fichier scss (index.scss) couleur icone pour la couleur de la carte
import { useDispatch, useSelector } from "react-redux";
import { resetUtilisateur } from "../../features/slice/loginSlice";
const Header = () => {
  const dispatch = useDispatch();
  const iconeconnexionStyles = {
    color: couleurssass.iconescss,
    fontSize: "40px",
    "&:hover": {
      color: "green", // Changer la couleur au survol
    },
  };
  const modalStyleParten = {
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
  const autorised = useSelector((state) => state.utilisateur.isAuthentified);
  const utilisateur = useSelector((state) => state.utilisateur.nom);
  const role = useSelector((state) => state.utilisateur.role);
  console.log("role", role, typeof role);
  const [flagModaleAgent, setFlagModaleAgent] = useState(false);
  const [loginApp, setLoginApp] = useState(false);
  const logApp = () => {
    setLoginApp(true);
  };
  const abordLogin = () => {
    setLoginApp(false);
  };
  const leaveApp = () => {
    dispatch(resetUtilisateur());
  };
  const gestionAgent = () => {
    console.log("routine gestion agent");
    setFlagModaleAgent(true);
  };
  const closeGestionAgent = () => {
    setFlagModaleAgent(false);
  };

  return (
    <main className="mainheader">
      <div className="containeurheader">
        <div className="logoheader">
            <img src="/assets/img/LogoGarageParrot.jpg" alt="Logo" />
        </div>
        <div className="navheader">
          <Navigation></Navigation>
        </div>
        <div className="titreheader">
          <div className="titreh">Garage V. PARROT</div>
        </div>{" "}
        <div className="iconeheader">
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
            <LoginIcon
              sx={iconeconnexionStyles}
              onClick={logApp}
            />
          )}
        </div>
        {/* modale de saisie du login*/}
        {loginApp && (
          <Dialog open={true} sx={modalStyleParten}>
            <Carteconnection onCancel={abordLogin} />
          </Dialog>
        )}
      </div>
      {/* modale de saisie des agents*/}
      {flagModaleAgent && (
        <Dialog open={true} sx={modalStyleParten}>
          <CarteAgentModale onCancel={closeGestionAgent} />
        </Dialog>
      )}
    </main>
  );
};

export default Header;
