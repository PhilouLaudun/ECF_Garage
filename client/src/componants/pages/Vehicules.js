import React, { useEffect, useState } from "react";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import dataPageService from "../../data/dataPageService";
import Presentation from "../autres/Presentation";
import dataCarteVehicule from "../../data/dataCarteVehicule";
import CarteVehicule from "../autres/CarteVehicule";
import FiltreVoiture from "../autres/FiltreVoiture";
const Vehicules = () => {
  const [vehicules, setVehicules] = useState(dataCarteVehicule);
  const [filtres, setFiltres] = useState({
    kilometrage: [0, 200000],
    prix: [0, 50000],
    annee: [2000, 2023],
  });

  // Rechercher les limites dans dataCarteVehicule
  const minKilometrage = Math.min(
    ...dataCarteVehicule.map((vehicule) => vehicule.kilometrage)
  );
  const maxKilometrage = Math.max(
    ...dataCarteVehicule.map((vehicule) => vehicule.kilometrage)
  );
  const minPrix = Math.min(
    ...dataCarteVehicule.map((vehicule) => vehicule.prix)
  );
  const maxPrix = Math.max(
    ...dataCarteVehicule.map((vehicule) => vehicule.prix)
  );
  const minAnnee = Math.min(
    ...dataCarteVehicule.map((vehicule) => vehicule.année)
  );
  const maxAnnee = Math.max(
    ...dataCarteVehicule.map((vehicule) => vehicule.année)
  );

  // Création du tableau des valeurs minimales et maximales
  const minMaxValues = {
    minKilometrage,
    maxKilometrage,
    minPrix,
    maxPrix,
    minAnnee,
    maxAnnee,
  };


  // Initialiser l'état filtres avec les valeurs minimales et maximales du fichier
  useEffect(() => {
    setFiltres({
      kilometrage: [minKilometrage, maxKilometrage],
      prix: [minPrix, maxPrix],
      annee: [minAnnee, maxAnnee],
    });
  }, [minKilometrage, maxKilometrage, minPrix, maxPrix, minAnnee, maxAnnee]);

  // Fonction de tri des véhicules
  const trierVehicules = (nouveauxFiltres) => {
    setFiltres((prevState) => ({ ...prevState, ...nouveauxFiltres }));
  };

  // Effet de mise à jour des véhicules triés
  useEffect(() => {
    const vehiculesTri = dataCarteVehicule.filter((vehicule) => {
      // Appliquez votre logique de tri ici
      return (
        vehicule.kilometrage >= filtres.kilometrage[0] &&
        vehicule.kilometrage <= filtres.kilometrage[1] &&
        vehicule.prix >= filtres.prix[0] &&
        vehicule.prix <= filtres.prix[1] &&
        vehicule.année >= filtres.annee[0] &&
        vehicule.année <= filtres.annee[1]
      );
    });
    setVehicules(vehiculesTri);
  }, [filtres]);

  /*            <div className="filtreoccase">
              <FiltreVoiture filtres={filtres} onTriChange={trierVehicules} />
            </div>   */
  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={7} largeur={45} />
          </div>
          <div className="zonevehicule">
            <div className="filtreoccase">
              <FiltreVoiture
                filtres={filtres}
                onTriChange={trierVehicules}
                minMaxValues={minMaxValues}
              />
            </div>
            <div className="carteoccase">
              {vehicules.map((vehicule) => (
                <CarteVehicule key={vehicule.id} vehicule={vehicule} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Vehicules;
