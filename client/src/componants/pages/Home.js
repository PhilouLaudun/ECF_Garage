import React from "react"; // chargement des composants react
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
// import des composants de la page
import Header from "../autres/Header";// header
import Footer from "../autres/Footer";//footer
import Presentation from "../autres/Presentation";// présentation de la page
import PetiteIcone from "../autres/PetiteIcone";// composant des petites icones pour afficher les infos de contact
import CarteService from "../autres/CarteService"; // composant d'affichage des cartes de service
import BlogCard from "../blog/BlogCard";// composant pour afficher le blog
// import des icones mui material
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";

// page principale de l'application
const Home = () => {
  const navigate = useNavigate() // fonction pour naviguer vers les autres pages 
  
  return (
    <>
      <main className="mainHome">
        {/* En tete */}
        <Header />
        {/* Corps de la page */}
        <div className="containerbodyhome">
          <div className="imageHome">
            <img src="./assets/img/Accueil2 et reparation.jpg" alt="Logo" />
            <img src="./assets/img/Accueil1.jpg" alt="Logo" />
          </div>
          <div className="presentHome">
            <Presentation className="" page={1} largeur={90} />
          </div>
          <div className="contactHome">
            <div className="contactitem">
              <PetiteIcone materialIcon={PhoneEnabledIcon} />
              <p>01 01 01 01 01</p>
            </div>
            <div className="contactitem" onClick={() => navigate("/contact")}>
              <PetiteIcone materialIcon={CalendarMonthIcon} />
              <p>Prendre rendez-vous</p> 
            </div>
            <div className="contactitem" onClick={() => navigate("/contact")}>
              <PetiteIcone materialIcon={EmailIcon} />
              <p>Contactez nous</p>
            </div>
          </div>
          <hr className="traithome"></hr>
          <div className="serviceHome">
            <div className="containerServiceHome">
              <div className="col1">
                <CarteService service={1} />
                <CarteService service={2} />
              </div>
              <div className="col2">
                <CarteService service={3} />
                <CarteService service={4} />
              </div>
              <div className="col3">
              <BlogCard/>
              </div>
            </div>
          </div>
        </div>
        {/* Pied de page */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
