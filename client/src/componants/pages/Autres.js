import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
import ServiceAffichage from "../autres/ServiceAffichage";
// page autres services
const Autres = () => {
  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={5} largeur={60} />
          </div>
          <div className="servicepage">
            <ServiceAffichage id={7} service={1} />
            <ServiceAffichage id={8} service={2} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Autres;
