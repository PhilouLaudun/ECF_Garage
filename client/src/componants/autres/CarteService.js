import React from 'react'
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
import dataCarteService from '../../data/dataCarteService'
import GrandeIcone from './GrandeIcone'

const CarteService = ({ service }) => {
  var carte = dataCarteService[service - 1];
  var titre = carte.titre;
  var message = carte.message;
  var icone = carte.icone;
  var navigation = carte.navigation;
  const navigate = useNavigate(); // définit une fonction de navigation pour aller sur la page concerné par l'icone sur la page acceui'
  const affichagePage = () => {
    console.log("affcihagePage");
    console.log("navigation", navigation);
    navigate(navigation);
    // Ajoutez la ligne suivante pour faire défiler vers le haut de la nouvelle page
    window.scrollTo(0, 0);
  };
  return (
    <main className="mainCarte" >
      <div className="iconecarte" onClick={affichagePage}>
        <GrandeIcone materialIcon={icone} />
      </div>
      <div className="titrecarte">{titre}</div>
      <div className="messagecarte">{message}</div>
    </main>
  );
}

export default CarteService