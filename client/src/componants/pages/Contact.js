import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
import CarteEmail from "../autres/CarteEmail";
// page contact
const Contact = () => {
  return (
    <>
      <main className="mainContact">
        <Header />
        <div className="containerbodycontact">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={6} largeur={45} />
          </div>
          <div className="contactcorps">
            <div className="itemcorps">
              <CarteEmail objetDemandeprops=""></CarteEmail>
            </div>
            <div className="itemcorps">
              <div className="adressefooter">
                <h2>Garage Vincent PERROT</h2>
                <p>1 Rue du Garage</p>
                <p>34000 MONTPELLIER</p>
                <p>04 67 01 01 01</p>
              </div>
              <img src="./assets/img/situation.jpg" alt="Logo" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Contact;
