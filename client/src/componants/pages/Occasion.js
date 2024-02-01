import React from "react";
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import dataPageService from "../../data/dataPageService";
import Presentation from "../autres/Presentation";
const Occasion = () => {
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

              <Presentation className="" page={4} largeur={45} />
            </div>
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

export default Occasion;
