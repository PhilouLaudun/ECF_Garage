import React from "react";// chargement des composants react
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
//import du fichier des données des composants de présentation de la page et de la gestion des mails
import Presentation from "../autres/Presentation";
import CarteEmail from "../autres/CarteEmail";
// page contact (pas de props passées)
const Contact = () => {
  return (
    <>
      <main className="mainContact">
        {/* En tete */}
        <Header />
        {/* Corps de la page */}
        <div className="containerbodycontact">
          {/* Affichage image du haut du coprs */}
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          {/* Affichage de la présentation de la page*/}
          <div className="presentPage">
            <Presentation className="" page={6} largeur={60} />
          </div>
          {/* Affichage du detail de la page */}
          <div className="contactcorps">
            {/* Affichage du formulaire de contact  */}
            <div className="itemcorps">
              {/*  props passée à null pour l'objet, sert uniquement pour la page fiche véhicule*/}
              <CarteEmail objetDemandeprops=""></CarteEmail>
            </div>
            {/* Affichage de l'adresse et de la carte*/}
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
        {/* Pied de page */}
        <Footer />
      </main>
    </>
  );
};

export default Contact;
