import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <main className="mainfooter">
      <div className="containerfooter">
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
        <div className="adressefooter">
          <h2>Garage Vincent PERROT</h2>
          <p>1 Rue du Garage</p>
          <p>34000 MONTPELLIER</p>
          <p>04 67 01 01 01</p>
        </div>
        <div className="horairefooter">
          <h2>HORAIRES D'OUVERTURE</h2>
          <p>Lundi : 8h-12h 14h-19h</p>
          <p>Mardi : 8h-12h 14h-19h</p>
          <p>Mercredi : 8h-12h 14h-19h</p>
          <p>Jeudi : 8h-12h 14h-19h</p>
          <p>Vendredi : 8h-12h 14h-19h</p>
          <p>Samedi : 8h-12h (occasion)</p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
