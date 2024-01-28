import React from 'react'
import dataCarteService from '../../data/dataCarteService'
import GrandeIcone from './GrandeIcone'

const CarteService = ({ service }) => {
    var carte = dataCarteService[service - 1]
    var titre = carte.titre
    var message = carte.message
    var icone= carte.icone
    return (
      <main className="mainCarte">
        <div className="iconecarte">
          <GrandeIcone materialIcon={icone} />
        </div>
        <div className="titrecarte">{titre}</div>
        <div className="messagecarte">{message}</div>
      </main>
    );
}

export default CarteService