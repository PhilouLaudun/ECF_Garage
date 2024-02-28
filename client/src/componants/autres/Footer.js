import React from "react";// chargement des composants react
//import des composants react
import Horaires from "./Horaires";
// import des icones mui material
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
//
//composant Footer (pas de props passées)
const Footer = () => {
  
  return (
    <main className="mainfooter">
      <div className="containerfooter">
        {/* Zone du logo et des  icones réseaux */}
        <div className="logofooter">
          <div>
            <img src="/assets/img/LogoGarageParrot.jpg" alt="Logo" />
          </div>
          <div className="containericonefooter">
            <FacebookIcon className="iconefooter" />
            <TwitterIcon className="iconefooter" />
            <InstagramIcon className="iconefooter" />
          </div>
          <div className="createurfooter">
            Création BOUDINAUD Philippe pour ECF Studi 2024
          </div>
        </div>
        {/* Zone de l'adresse */}
        <div className="adressefooter">
          <h2>Garage Vincent PARROT</h2>
          <p>1 Rue du Garage</p>
          <p>34000 MONTPELLIER</p>
          <p>04 67 01 01 01</p>
        </div>
        {/* Zone des horaires */}
        <div className="horairefooter">
          <Horaires />
        </div>
      </div>
    </main>
  );
};

export default Footer;
