import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";

// css dans fichier _fichevehicule.scss

const SyntheseVehicule = ({ id }) => {
  const vehicules = useSelector((state) => state.vehicule.vehicule);
  const vehicule = vehicules.find((v) => v.id_vehicule === id);
  const {
    Marque,
    Modele,
    Modeleprecis,
    Annee,
    Kilometrage,
    Energie,
    Transmission,
    UrlPhoto,
    Prix,
  } = vehicule;
  return (
    <div className="cartesynthese">
      <div className="titresynthese">
        {Marque} {Modele}
      </div>
      <div className="precisionmodele">{Modeleprecis} </div>
      <div className="infosynthese">
        {Annee} | {Kilometrage} Km | {Transmission} | {Energie}
      </div>
      <div className="prixsynthese">{Prix}€</div>
      <div className="containerboutonmail">
        {" "}
        <button className="boutonsynthese">
          <EmailIcon />
        </button>
      </div>
    </div>
  );
};

export default SyntheseVehicule;
