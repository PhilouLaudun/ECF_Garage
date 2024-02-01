import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const FiltreVoiture = ({ filtres, onTriChange, minMaxValues }) => {
  const {
    minKilometrage,
    maxKilometrage,
    minPrix,
    maxPrix,
    minAnnee,
    maxAnnee,
  } = minMaxValues;
  console.log("filtres", filtres)
  console.log("minMaxValues", minMaxValues);
  const [kilometrage, setKilometrage] = useState(filtres.kilometrage);
  const [prix, setPrix] = useState(filtres.prix);
  const [annee, setAnnee] = useState(filtres.annee);

  console.log(kilometrage,prix,annee)
  const styleslider = {
    marginBottom: "20px",
  };

  useEffect(() => {
    setKilometrage(filtres.kilometrage);
    setPrix(filtres.prix);
    setAnnee(filtres.annee);
  }, [filtres.kilometrage, filtres.prix, filtres.annee]);

  const handleKilometrageChange = (event, newValue) => {
    setKilometrage(newValue);
    onTriChange({ kilometrage: newValue });
  };

  const handlePrixChange = (event, newValue) => {
    setPrix(newValue);
    onTriChange({ prix: newValue });
  };

  const handleAnneeChange = (event, newValue) => {
    setAnnee(newValue);
    onTriChange({ annee: newValue });
  };

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
  const kilometrageMarks = [{ value: minKilometrage, label: minKilometrage },
  { value: maxKilometrage, label: maxKilometrage }];
 const prixMarks = [
   { value: minPrix, label: minPrix },
   { value: maxPrix, label: maxPrix },
 ];
 const anneeMarks = [
   { value: minAnnee, label: minAnnee },
   { value: maxAnnee, label: maxAnnee },
 ];
  return (
    <main className="mainfiltre">
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

      <Button variant="outlined" onClick={annulerTri}>
        Annuler les filtres
      </Button>
    </main>
  );
};

export default FiltreVoiture;
