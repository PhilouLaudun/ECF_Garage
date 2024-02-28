import React, { useEffect, useState } from "react";// chargement des composants react
// import des composants mui material
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// composant d'affichage des tri par slider: props passées : filtres = contient les valeurs min et max des filtres liées au glissement du slide/onTriChange: fonction callback pour gerer la modification de l'affichage liée au tri / minMaxValues : valeurs min et max des slides liées aux données des véhicules à vendre
const FiltreVoiture = ({ filtres, onTriChange, minMaxValues }) => {
  const {
    minKilometrage,
    maxKilometrage,
    minPrix,
    maxPrix,
    minAnnee,
    maxAnnee,
  } = minMaxValues; // récupére les valeurs minimales et maximales liées aux véhicules en cours de vente
  const [kilometrage, setKilometrage] = useState(filtres.kilometrage); // récupére les valeurs min et max modifiées par le glissement du slide kilométrage
  const [prix, setPrix] = useState(filtres.prix); // récupére les valeurs min et max modifiées par le glissement du slide prix
  const [annee, setAnnee] = useState(filtres.annee); // récupére les valeurs min et max modifiées par le glissement du slide annee
  // définition du style du slide
  const styleslider = {
    marginBottom: "20px",
  };
  // useEffect déclenché la modification des valeurs des slides
  useEffect(() => {
    setKilometrage(filtres.kilometrage); // range les nouvelles valeurs min et max modifiées par le glissement du slide kilométrage
    setPrix(filtres.prix); // range les nouvelles valeurs min et max modifiées par le glissement du slide prix
    setAnnee(filtres.annee); // range les nouvelles valeurs min et max modifiées par le glissement du slide annee
  }, [filtres.kilometrage, filtres.prix, filtres.annee]);
  // fonction appelée lors de la modification sur le slide kilométrage
  const handleKilometrageChange = (event, newValue) => {
    setKilometrage(newValue);
    onTriChange({ kilometrage: newValue }); // appel de la fonction callback pour trier les véhicules par kilométrage
  };
  // fonction appelée lors de la modification sur le slide prix
  const handlePrixChange = (event, newValue) => {
    setPrix(newValue);
    onTriChange({ prix: newValue }); // appel de la fonction callback pour trier les véhicules par prix
  };
  // fonction appelée lors de la modification sur le slide annee
  const handleAnneeChange = (event, newValue) => {
    setAnnee(newValue);
    onTriChange({ annee: newValue }); // appel de la fonction callback pour trier les véhicules par année
  };
  // fonction appelée par click sur le bouton pour annuler les tris éffectués: remet les valeurs de filtres au valeurs initiales
  const annulerTri = () => {
    // Réinitialiser les sliders avec les valeurs par défaut basées sur les valeurs passées en props
    setKilometrage([minMaxValues.minKilometrage, minMaxValues.maxKilometrage]);
    setPrix([minMaxValues.minPrix, minMaxValues.maxPrix]);
    setAnnee([minMaxValues.minAnnee, minMaxValues.maxAnnee]);

    // Réinitialiser les filtres dans le composant parent en appelant la fonction onTriChange
    onTriChange({
      kilometrage: [minMaxValues.minKilometrage, minMaxValues.maxKilometrage],
      prix: [minMaxValues.minPrix, minMaxValues.maxPrix],
      annee: [minMaxValues.minAnnee, minMaxValues.maxAnnee],
    });
  };
  // données pour l'affichage des limites min et max sur le  slider kilométrage
  const kilometrageMarks = [
    { value: minKilometrage, label: minKilometrage },
    { value: maxKilometrage, label: maxKilometrage },
  ];
  // données pour l'affichage  des limites min et max sur le  slider prix
  const prixMarks = [
    { value: minPrix, label: minPrix },
    { value: maxPrix, label: maxPrix },
  ];
  // données pour l'affichage des limites min et max sur le  slider année
  const anneeMarks = [
    { value: minAnnee, label: minAnnee },
    { value: maxAnnee, label: maxAnnee },
  ];
  return (
    <main className="mainfiltre">
      {/* Affichage du slider kilométrage */}
      <Typography id="kilometrage-slider" gutterBottom>
        Kilométrage
      </Typography>
      <Slider
        value={kilometrage}
        onChange={handleKilometrageChange}
        valueLabelDisplay="auto"
        aria-labelledby="kilometrage-slider"
        min={minKilometrage}
        max={maxKilometrage}
        sx={styleslider}
        marks={kilometrageMarks}
      />
      {/* Affichage du slider prix */}
      <Typography id="prix-slider" gutterBottom>
        Prix
      </Typography>
      <Slider
        value={prix}
        onChange={handlePrixChange}
        valueLabelDisplay="auto"
        aria-labelledby="prix-slider"
        min={minPrix}
        max={maxPrix}
        marks={prixMarks}
        sx={styleslider}
      />
      {/* Affichage du slider année */}
      <Typography id="annee-slider" gutterBottom>
        Année
      </Typography>
      <Slider
        value={annee}
        onChange={handleAnneeChange}
        valueLabelDisplay="auto"
        aria-labelledby="annee-slider"
        min={minAnnee}
        max={maxAnnee}
        marks={anneeMarks}
        sx={styleslider}
      />
      {/* Affichage du bouton d'annulation des ficltres*/}
      <Button variant="outlined" onClick={annulerTri}>
        Annuler les filtres
      </Button>
    </main>
  );
};

export default FiltreVoiture;
