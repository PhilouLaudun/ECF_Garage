import React, { useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import { useState } from "react";
import SyntheseModale from "./SyntheseModale";
import { listVehicule } from "../../features/slice/vehiculeSlice";

// css dans fichier _fichevehicule.scss

const SyntheseVehicule = () => {
  const dispatch = useDispatch();
  let id = useSelector((state) => state.vehicule.vehiculeEnCours);
  const vehicules = useSelector((state) => state.vehicule.vehicule);
  const [vehicule, setVehicule] = useState(
    vehicules.find((v) => v.id_vehicule === id)
  ); // Initialise vehicule avec la valeur initiale

  //let vehicule = vehicules.find((v) => v.id_vehicule === id);
  const [flagEdit, setFlagEdit] = useState(false);
  const iconeStyle = {
    fontSize: "35px",
    marginLeft: "40px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const modalStyle = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "400px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": { borderRadius: "20px" },
  };
 useEffect(() => {
   // Mettre à jour vehicule lorsque vehicules est mis à jour
   const selectedVehicule = vehicules.find((v) => v.id_vehicule === id);
    setVehicule(selectedVehicule);
  }, [vehicules, id]);

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

  const editSyntheseVehicule = () => {
    setFlagEdit(true);
  };
  const closeSyntheseVehicule = () => {
    console.log("close modale syntheseVehicule");
    dispatch(listVehicule)
    setFlagEdit(false);
  };
  return (
    <div className="cartesynthese">
      <div className="titresynthese">
        <div>
          {Marque} {Modele}
        </div>
        <EditTwoToneIcon sx={iconeStyle} onClick={editSyntheseVehicule} />
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
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
          {console.log("vehicule synthese", vehicule)}
          <SyntheseModale vehicule={vehicule} onClose={closeSyntheseVehicule} />
        </Dialog>
      )}
    </div>
  );
};

export default SyntheseVehicule;
