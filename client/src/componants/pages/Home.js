import React from "react";
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
import PetiteIcone from "../autres/PetiteIcone";
import CarteService from "../autres/CarteService";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";

const Home = () => {
  const navigate= useNavigate()
  return (
    <>
      <main className="mainHome">
        <Header />
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
              <div className="col3">avis client à construire</div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
