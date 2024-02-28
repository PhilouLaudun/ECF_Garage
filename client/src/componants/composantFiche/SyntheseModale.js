import React, { useState } from "react";// chargement des composants react
import { useDispatch } from "react-redux";// chargement des fonctions de gestion du store
// import des composants mui material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
// import des fonctions de gestion du store
import { updateVehicule } from "../../features/slice/vehiculeSlice";
// composant SynthéseModal pour la modification des données de synthése d'un véhicule (props passées : vehicule: donnée du véhicule / onClose: focntion callback lors de la fermeture de la modale)
const SyntheseModale = ({ vehicule, onClose }) => {
  const dispatch = useDispatch();// focntion d'appel des slices
  // chargement des données à modifier et à, afficher dans les inputs
  const [marque, setMarque] = useState(vehicule.Marque);// marque
  const [modele, setModele] = useState(vehicule.Modele);// modéle
  const [modelePrecis, setModelePrecis] = useState(vehicule.Model)// modéle précis;
  const [annee, setAnnee] = useState(vehicule.Annee);// année
  const [kilometrage, setKilometrage] = useState(vehicule.Kilometrage);// kilométrage
  const [transmission, setTransmission] = useState(vehicule.Transmission);// boite de vitesse
  const [energie, setEnergie] = useState(vehicule.Energie);// energie
  const [prix, setPrix] = useState(vehicule.Prix);// prix
  const [open, setOpen] = useState(false); // open : variable contenant le drapeau d'affichage de la boite de dialogue de validation des données modifiées,
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
// fonction de sauvegarde des données de synthése du véhicule
  const saveInfoVehicule = () => {
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
  // fonction de fermeture de la boite de dialogue de validation des données
  const nonValid = () => {
    setOpen(false);
  };
  // fonction de sauvegarde des données modifiées
  const validDonneeVehicule = () => {
    setOpen(false);// fermeture de la boite de dialogue de validation des données
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

        const id = vehicule.id_vehicule;
    dispatch(updateVehicule({ id: id, data: formData }));// update les données dans la base de données
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
