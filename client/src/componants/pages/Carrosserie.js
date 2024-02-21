import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
//import du fichier des données du composant de présentation de la page
import dataPageService from "../../data/dataPageService";
// page carosserie
const Carrosserie = () => {
  //chargement des données concernant la présentation des services liées à cette page
  var carte1 = dataPageService[2];
  var carte2 = dataPageService[3];
  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={3} largeur={45} />
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

export default Carrosserie;
