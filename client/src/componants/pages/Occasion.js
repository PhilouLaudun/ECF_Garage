import React from "react";// chargement des composants react
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
//import du fichier des données du composant de présentation de la page
import dataPageService from "../../data/dataPageService";
// page occasion
const Occasion = () => {
  //chargement des données concernant la présentation des services liées à cette page
  var carte1 = dataPageService[4];
  var carte2 = dataPageService[5];
  const navigate = useNavigate();
  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <div className="occasepresentation">
              <div className="containerbouton">
                <button
                  className="boutonoccase"
                  onClick={() => navigate("/vehicule")}
                >
                  Découvrez les véhicules
                </button>
              </div>
              <Presentation className="containerpresentat" page={4} largeur={45} />
            </div>
          </div>
          <div className="servicepage">
            <div className="service1">
              <img className="imge1" src={carte1.image} alt="Logo" />
              <div className="servi1">
                <div className="titreservice">{carte1.titre}</div>
                <div className="texteservice">{carte1.texte}</div>
              </div>
            </div>
            <div className="service2">
              <div className="servi1">
                <div className="titreservice">{carte2.titre}</div>
                <div className="texteservice">{carte2.texte}</div>
              </div>
              <img className="imge2" src={carte2.image} alt="Logo" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Occasion;
