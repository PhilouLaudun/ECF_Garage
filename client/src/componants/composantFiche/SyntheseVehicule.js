import React from "react";
import dataCarteVehicule from "../../data/dataCarteVehicule";
import EmailIcon from "@mui/icons-material/Email";

// css dans fichier _fichevehicule.scss

const SyntheseVehicule = ({ id }) => {
  const vehicule = dataCarteVehicule[id - 1];
  console.log("voiture", vehicule);
  const {
    marque,
    modéle,
    modeleprecis,
    année,
    kilometrage,
    energie,
    transmission,
    photo,
    prix,
  } = vehicule;
  return (
    <div>
      <div className="titresynthese">
        {marque} {modéle}
      </div>
      <div className="precisionmodele">{modeleprecis} </div>
      <div className="infosynthese">
        {année} | {kilometrage} Km | {transmission} | {energie}
      </div>
      <div className="prixsynthese">{prix}€</div>
      <div className="containerboutonmail">
        {" "}
        <button className="boutonsynthese"><EmailIcon/></button>
      </div>
    </div>
  );
};

export default SyntheseVehicule;
