import React from 'react'// chargement des composants react
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
// import des composants react
import dataCarteService from '../../data/dataCarteService'
import GrandeIcone from './GrandeIcone'

//  composant CarteService (props passées : id du service à afficher)
const CarteService = ({ service }) => {
  var carte = dataCarteService[service - 1];// décrémente de 1 le id pour charger les données : tableau commencant à 0 pour id = 1
  var titre = carte.titre;// titre de la carte
  var message = carte.message;// texte du service
  var icone = carte.icone;// icone du service
  var navigation = carte.navigation;// page vers lequel dirige l'icone
  const navigate = useNavigate(); // définit une fonction de navigation pour aller sur la page concerné par l'icone sur la page acceuil
  const affichagePage = () => {
    navigate(navigation);
    // Ajoutez la ligne suivante pour faire défiler vers le haut de la nouvelle page
    window.scrollTo(0, 0);
  };
  return (
    <main className="mainCarte" >
      {/* Affichage de l'icone*/}
      <div className="iconecarte" onClick={affichagePage}>
        <GrandeIcone materialIcon={icone} />
      </div>
      {/* Affichage du titre*/}
      <div className="titrecarte">{titre}</div>
            {/* Affichage du texte*/}
      <div className="messagecarte">{message}</div>
    </main>
  );
}

export default CarteService