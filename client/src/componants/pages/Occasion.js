import React from "react";// chargement des composants react

// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
//import du fichier des données du composant de présentation de la page
// page occasion
const Occasion = () => {

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
              <Presentation
                className="containerpresentat"
                page={4}
                largeur={45}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Occasion;
