import React, { useState } from "react";
import Navigation from "./Navigation";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Carteconnection from "./Carteconnexion"
import { Box, CircularProgress, Dialog } from "@mui/material"; // import du composant Dialog pour  afficher la modale et des composants pour l'affichage de l'attente du chargement
import couleurssass from "../../styles/_settings.scss";// import des variables définies dans le fichier scss (index.scss) couleur icone pour la couleur de la carte
import { useDispatch, useSelector } from "react-redux";
import { resetUtilisateur } from "../../features/slice/loginSlice";
const Header = () => {
  const dispatch=useDispatch()
  const iconeconnexionStyles = {
    color: couleurssass.iconescss,
    fontSize: "40px",
    "&:hover": {
      color: "green", // Changer la couleur au survol
    },
  };
  const modalStyleParten = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "00px",
    width: "400px",
    "& .MuiPaper-root": { background: "transparent", borderRadius: "20px" },
    "& .MuiDialog-paper": { background: "transparent", borderRadius: "20px" },
  };
  const autorised = useSelector((state) => state.utilisateur.isAuthentified);
  const utilisateur = useSelector((state) => state.utilisateur.nom)
  
  const [loginApp, setLoginApp] = useState(false)
  
  const logApp = () => {
    setLoginApp(true)
  }
  const abordLogin = () => { 
    setLoginApp(false)
  }
  const leaveApp = () => {
    dispatch(resetUtilisateur());
  }

  return (
    <main className="mainheader">
      <div className="containeurheader">
        <div className="logoheader">
          <div>
            <img src="/assets/img/LogoGarageParrot.jpg" alt="Logo" />
          </div>
        </div>
        <div className="navheader">
          <Navigation></Navigation>
        </div>
        <div className="titreheader">
          <div className="titreh">Garage V. PARROT</div>
          {autorised ? (
            <>      <LogoutIcon sx={iconeconnexionStyles} onClick={leaveApp} />
            <div className="nomutilisateur">{utilisateur}</div></>
      
          ) : (
            <LoginIcon sx={iconeconnexionStyles} onClick={logApp} />
          )}
        </div>
        {/* modale de saisie du login*/}
        {loginApp && (
          <Dialog open={true} sx={modalStyleParten}>
            <Carteconnection onCancel={abordLogin} />
          </Dialog>
        )}
      </div>
    </main>
  );
};

export default Header;
