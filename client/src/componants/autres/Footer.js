import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Horaires from "./Horaires";

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
          <h2>Garage Vincent PARROT</h2>
          <p>1 Rue du Garage</p>
          <p>34000 MONTPELLIER</p>
          <p>04 67 01 01 01</p>
        </div>
        <div className="horairefooter">
          <Horaires/>
        </div>
      </div>
    </main>
  );
};

export default Footer;
