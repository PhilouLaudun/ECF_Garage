import React from 'react'
import dataFicheVehicule from '../../data/dataFicheVehicule';

// css dans fichier _fichevehicule.scss

const CaracteristiqueVehicule = ({ id }) => {
  const caractvehicule = dataFicheVehicule[id-1];
  const {
    provenance,
    miseencirculation,
    couleur,
    nombreporte,
    nombreplace,
    longueur,
    largeur,
    volumecoffre,
    puissancefiscal,
    puissancemoteur,
  } = caractvehicule;
  return (
    <div>
      <div className="titrecaracter">Caractéristiques</div>
      <div className="donnéecaracter">
        <div>Provenance : {provenance}</div>
        <div>Date de mise en circulation : {miseencirculation}</div>
        <div>Couleur : {couleur}</div>
        <div>Nombres de portes : {nombreporte}</div>
        <div>Nombres de places : {nombreplace} </div>
        <div>Longeur : {longueur} </div>
        <div>Largeur: {largeur} </div>
        <div className='separationcaract'>Volume du coffre: {volumecoffre} </div>
        <div>Puissance fiscale (Cv) : {puissancefiscal} </div>
        <div>Puissances (DIN) : {puissancemoteur} </div>
      </div>
    </div>
  );
};

export default CaracteristiqueVehicule