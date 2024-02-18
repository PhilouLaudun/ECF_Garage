import React, { useState } from "react";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "./CustomArrow";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateVehicule } from "../../features/slice/vehiculeSlice";

const SyntheseModale = ({ vehicule, onClose }) => {
console.log("vehicule", vehicule)

  const [marque, setMarque] = useState(vehicule.Marque);
  const [modele, setModele] = useState(vehicule.Modele);
  const [modelePrecis, setModelePrecis] = useState(vehicule.Modeleprecis);
  const [annee, setAnnee] = useState(vehicule.Annee);
  const [kilometrage, setKilometrage] = useState(vehicule.Kilometrage);
  const [transmission, setTransmission] = useState(vehicule.Transmission);
  const [energie, setEnergie] = useState(vehicule.Energie);
  const [prix, setPrix] = useState(vehicule.Prix);
  const [open, setOpen] = useState(false); // open : variable contenant le drapeau d'affichage de la boite de dialogue,
  // definition du style des composants icones de sauvegarde et d'annulation

  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const dispatch = useDispatch();

  const saveInfoVehicule = () => {
    console.log("Saving info vehicule");
    // verif effectuées: champs vides pour tous
    // on mets le flag de vérification à true dés le départ et on le passe à false si il y a une anomalie, on récupére ensuite les id des div pour afficher les divers messages liés aux saisies obligatoires (non nulles)
    var flagOk = true;
    // adresse des div pour les messages concernant les champs non vide et url et email valide
    var messagemarque = document.getElementById("messagemarque");
    var messagemodele = document.getElementById("messagemodele");
    var messagemodeleprecis = document.getElementById("messagemodeleprecis");
    var messageannee = document.getElementById("messageannee");
    var messagekilometrage = document.getElementById("messagekilometrage");
    var messagetransmission = document.getElementById("messagetransmission");
    var messageenergie = document.getElementById("messageenergie");
    var messageprix = document.getElementById("messageprix");
    var res = true; // res: résultat du test par la fonction
    res = verifChampVide(marque, messagemarque); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(modele, messagemodele); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(modelePrecis, messagemodeleprecis); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(annee, messageannee); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(kilometrage, messagekilometrage); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(transmission, messagetransmission); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(energie, messageenergie); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(prix, messageprix); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux


    if (flagOk) {
      setOpen(true); // léve le drapeau d'affichage de la boite de dialogue pour valider les données
    }
  };
  const nonValid = () => {
    setOpen(false);
  };
  const validDonneeVehicule = () => {
    setOpen(false);
    // sauve les données modifiées ou pas dans un formData (sinon multer ne fonctionne pas)
    const formData = new FormData(); // formData pour envoi des données vers le serveur et ceci pour que multer puisse traiter le fichier image
    formData.append("id_vehicule", vehicule.id_vehicule);
    formData.append("UrlPhoto", vehicule.UrlPhoto);// a rajouter pour update par la suite
    formData.append("Marque", marque);
    formData.append("Modele", modele);
    formData.append("Modeleprecis", modelePrecis);
    formData.append("Annee", annee);
    formData.append("Kilometrage", kilometrage);
    formData.append("Energie", energie);
    formData.append("Transmission", transmission);
    formData.append("Prix", prix);

    // Parcours des entrées de FormData et affichage dans la console
    for (const entry of formData.entries()) {
      console.log(entry[0] + ":", entry[1]);
    }
        const id = vehicule.id_vehicule;
        console.log("id:", id, typeof id);
    dispatch(updateVehicule({ id: id, data: formData }));
    onClose()
  };


  // fonction de test des champs vides
  const verifChampVide = (champ, message) => {
    console.log("champ", champ);
    // récupére le champ à tester et si il est nul, affiche le message pendant 3s et renvoi false (pour les tests suivants) sinon renvoi true (champ non vide)
    // Si le champ est un tableau et a une longueur supérieure à zéro, ou si le champ est une chaîne non vide, retourne true
    if (
      champ !== undefined &&
      champ !== null &&
      champ.toString().trim() !== ""
    ) {
      return true;
    } else {
      message.innerHTML = "Ce champ doit être renseigné";
      setTimeout(function () {
        message.innerHTML = "";
      }, 3000);
      return false;
    }
  };
  //
  return (
    <main className="mainmodalecartevehicule">

      {/* zone de la Marque du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Marque</div>
        <input
          type="text"
          className="stylesaisie"
          value={marque}
          placeholder="Marque"
          onChange={(e) => {
            setMarque(e.target.value);
          }}
        />
        <div id="messagemarque" className="messagemodalevehicule"></div>
      </div>
      {/* zone du modele du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Modèle</div>
        <input
          type="text"
          className="stylesaisie"
          value={modele}
          placeholder="Modèle"
          onChange={(e) => {
            setModele(e.target.value);
          }}
        />
        <div id="messagemodele" className="messagemodalevehicule"></div>
      </div>
      {/* zone du modèle précis du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Modèle précis</div>
        <input
          type="text"
          className="stylesaisie"
          value={modelePrecis}
          placeholder="Modèle précis"
          onChange={(e) => {
            setModelePrecis(e.target.value);
          }}
        />
        <div id="messagemodeleprecis" className="messagemodalevehicule"></div>
      </div>
      {/* zone de l'année du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Année</div>
        <input
          type="number"
          className="stylesaisie"
          value={annee}
          placeholder="Année"
          onChange={(e) => {
            setAnnee(e.target.value);
          }}
        />
        <div id="messageannee" className="messagemodalevehicule"></div>
      </div>
      {/* zone du kilométrage du véhicule */}
      <div className="divdonnee">
        <div className="intitule">kilométrage (Km)</div>
        <input
          type="number"
          className="stylesaisie"
          value={kilometrage}
          placeholder="kilometrage"
          onChange={(e) => {
            setKilometrage(e.target.value);
          }}
        />
        <div id="messagekilometrage" className="messagemodalevehicule"></div>
      </div>
      {/* zone du type de transmission du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Transmission</div>
        <input
          type="text"
          className="stylesaisie"
          value={transmission}
          placeholder="Transmission"
          onChange={(e) => {
            setTransmission(e.target.value);
          }}
        />
        <div id="messagetransmission" className="messagemodalevehicule"></div>
      </div>
      {/* zone du type d'energie' du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Energie</div>
        <input
          type="text"
          className="stylesaisie"
          value={energie}
          placeholder="Energie"
          onChange={(e) => {
            setEnergie(e.target.value);
          }}
        />
        <div id="messageenergie" className="messagemodalevehicule"></div>
      </div>
      {/* zone du prix du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Prix €</div>
        <input
          type="number"
          className="stylesaisie"
          value={prix}
          placeholder="Prix"
          onChange={(e) => {
            setPrix(e.target.value);
          }}
        />
        <div id="messageprix" className="messagemodalevehicule"></div>
      </div>
      {/* zone des icones */}
      <div className="iconemodif">
        <SaveTwoToneIcon sx={iconeStyle} onClick={saveInfoVehicule} />
        <Dialog open={open} sx={{ zIndex: 20, display: "flex", left: "20%" }}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Etes-vous sure de vouloir valider ces modifications
          </DialogContent>
          <DialogActions>
            <Button onClick={nonValid}>Non</Button>
            <Button autoFocus onClick={validDonneeVehicule}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
        <CancelTwoToneIcon sx={iconeStyle} onClick={onClose} />
      </div>
    </main>
  );
};

export default SyntheseModale;
