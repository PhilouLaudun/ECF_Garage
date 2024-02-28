import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
//import du fichier des données des composants de présentation de la page et des services
import Presentation from "../autres/Presentation";
import ServiceAffichage from "../autres/ServiceAffichage";
// page carosserie (pas de props passées)
const Carrosserie = () => {
  return (
    <>
      <main>
        {/* En tete */}
        <Header />
        {/* Corps de la page */}
        <div className="containerbodyservice">
          {/* Affichage image du haut du coprs */}
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          {/* Affichage de la présentation de la page*/}
          <div className="presentPage">
            <Presentation className="" page={3} largeur={60} />
          </div>
          {/* Affichage du detail des services */}
          <div className="servicepage">
            <ServiceAffichage id={3} service={1} />
            <ServiceAffichage id={4} service={2} />
          </div>
        </div>
        {/* Pied de page */}
        <Footer />
      </main>
    </>
  );
};

export default Carrosserie;
