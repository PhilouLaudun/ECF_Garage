import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
//import du fichier des données du composant de présentation de la page
import ServiceAffichage from "../autres/ServiceAffichage";
// page entretien
const Entretien = () => {

  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={2} largeur={60} />
          </div>
          <div className="servicepage">
            <ServiceAffichage id={1} service={1} />
            <ServiceAffichage id={2} service={2} />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Entretien;
