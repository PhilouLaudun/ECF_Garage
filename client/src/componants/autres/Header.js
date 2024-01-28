import React from "react";
import Navigation from "./Navigation";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import couleurssass from "../../styles/_settings.scss";// import des variables définies dans le fichier scss (index.scss) couleur icone pour la couleur de la carte
const Header = () => {
  const iconeconnexionStyles = {
    color: couleurssass.iconescss,
    fontSize: "50px",
  };
  return (
    <main className="mainheader">
      <div className="containeurheader">
        <div className="logoheader">
          <div>
            <img src="./assets/img/LogoGarageParrot.jpg" alt="Logo" />
          </div>
          
        </div>
        <div className="navheader">
          <Navigation></Navigation>
        </div>
        <div className="titreheader">
          <div className="titreh">Garage V. PARROT</div>
          <SupervisorAccountIcon
            sx={iconeconnexionStyles}
          ></SupervisorAccountIcon>
        </div>
      </div>
    </main>
  );
};

export default Header;
