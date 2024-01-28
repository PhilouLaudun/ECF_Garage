import React from "react";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import dataPageService from "../../data/dataPageService";
import Presentation from "../autres/Presentation";
const Entretien = () => {
  var carte1 = dataPageService[0];
  var carte2 = dataPageService[1];
  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/Accueil1.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={2} largeur={45} />
          </div>
          <div className="servicepage">
            <div className="service1">
              <img src={carte1.image} alt="Logo" />
              <div className="infoservice">
                <div className="titreservice">{carte1.titre}</div>
                <div className="texteservice">{carte1.texte}</div>
              </div>
            </div>
            <div className="service1">
              <div className="infoservice">
                <div className="titreservice">{carte2.titre}</div>
                <div className="texteservice">{carte2.texte}</div>
              </div>
              <img src={carte2.image} alt="Logo" />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Entretien;
