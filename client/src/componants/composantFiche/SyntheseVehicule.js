import React, { useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import { useState } from "react";
import SyntheseModale from "./SyntheseModale";
import { listVehicule } from "../../features/slice/vehiculeSlice";
import CarteEmail from "../autres/CarteEmail";

// css dans fichier _fichevehicule.scss

const SyntheseVehicule = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  const dispatch = useDispatch();
  let id = useSelector((state) => state.vehicule.vehiculeEnCours);
  const vehicules = useSelector((state) => state.vehicule.vehicule);
  const [vehicule, setVehicule] = useState(
    vehicules.find((v) => v.id_vehicule === id)
  ); // Initialise vehicule avec la valeur initiale

  //let vehicule = vehicules.find((v) => v.id_vehicule === id);
  const [flagEdit, setFlagEdit] = useState(false);
  const [flagMail, setFlagMail] = useState(false);

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
    width: "450px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": {
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.8)",
    },
    "@media (max-width: 420px)": {
      position: "absolute",
      top: "10%",
      left: "-13%",
      // Ajoutez d'autres styles selon vos besoins
    },
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
  let objetMessages = Marque + "  -  "+ Modele+ " - "+ Modeleprecis
  console.log("objetMessages:",objetMessages)
  const editSyntheseVehicule = () => {
    setFlagEdit(true);
  };
  const closeSyntheseVehicule = () => {
    console.log("close modale syntheseVehicule");
    dispatch(listVehicule)
    setFlagEdit(false);
  };
  const sendEmail = () => {
    setFlagMail(true);
  }
  const closeEmail = () => { 
    setFlagMail(false);
  }
  return (
    <div className="cartesynthese">
      <div className="titresynthese">
        <div>
          {Marque} {Modele}
        </div>
        {authorized && (
          <EditTwoToneIcon sx={iconeStyle} onClick={editSyntheseVehicule} />
        )}
      </div>
      <div className="precisionmodele">{Modeleprecis} </div>
      <div className="infosynthese">
        {Annee} | {Kilometrage} Km | {Transmission} | {Energie}
      </div>
      <div className="prixsynthese">{Prix}€</div>
      <div className="containerboutonmail">
        <button className="boutonsynthese">
          <EmailIcon onClick={sendEmail} />
        </button>
      </div>
      {flagEdit && (
        <Dialog open={true} sx={modalStyle}>
          <SyntheseModale vehicule={vehicule} onClose={closeSyntheseVehicule} />
        </Dialog>
      )}
      {flagMail && (
        <Dialog open={true} sx={modalStyle}>
          <CarteEmail
            onClose={closeEmail}
            objetDemandeprops={ objetMessages}
          />
        </Dialog>
      )}
    </div>
  );
};

export default SyntheseVehicule;
