import React, { useState } from "react";// chargement des composants react
import { useDispatch } from "react-redux";// chargement des fonction de gestion du store
// import des composants mui material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import des composant du carroussel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../composantFiche/CustomArrow"; // formatage des fléches de déroulement du carroussel
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
// gestion du store
import { createVehicule, listVehicule } from "../../features/slice/vehiculeSlice";
// composant modale de création d'un vehicule: props passées : onClose: callback de sortie de la modale/ newvehicule : flag pour signifier la création d'un véhicule (à virer car on utilise pas cette modale pour la modification, a voir)
const ModaleCarteVehicule = ({ onClose, newvehicule }) => {
  // initialisation des variables pour la saisie dans les champs des données du vehicule
  const [images, setImages] = useState([]); // tableau des images
  const [marque, setMarque] = useState(""); // marque du vehicule
  const [modele, setModele] = useState(""); // modéle du vehicule
  const [modelePrecis, setModelePrecis] = useState(""); // modéle précis du vehicule
  const [annee, setAnnee] = useState(""); // année du vehicule
  const [kilometrage, setKilometrage] = useState(""); // kilométrage du vehicule
  const [transmission, setTransmission] = useState(""); // type boite du vehicule
  const [energie, setEnergie] = useState(""); // type energie du vehicule
  const [prix, setPrix] = useState(""); //prix du vehicule
  const [open, setOpen] = useState(false); // open : variable contenant le drapeau d'affichage de la boite de dialogue de validation des données,
  // definition du style du composant carroussel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  // définition du style des icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const dispatch = useDispatch();// fonction d'appel du store
  // fonction de gestion de la création des images
  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        const { dataURL, name } = await readFileAsBase64(file);// récupére l'url et le nom du fichier
        const fileExtension = name.split(".").pop().toLowerCase();// récupére l'extension du fichier
        const acceptedExtensions = ["jpeg", "jpg", "png", "tiff"]; // vérification de la validité de l'extension
// si l'extension est correcte (fichier image) on ajoute au tableau newImage l'url modifiée avec la date du jour
        if (acceptedExtensions.includes(fileExtension)) {
          newImages.push({ id: Date.now() + i, url: dataURL });
        } else {
          console.log("Ce fichier n'est pas une image valide:", name);
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
      }
    }
    setImages((prevImages) => [...prevImages, ...newImages]);// charge le tableau d'affichage des données avec les nouvelles images
  };
   // fonction de lecture d'un fichier image
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          dataURL: reader.result,
          name: file.name,
        });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  // focntion de sauvegarde du nouveau véhicule
  const saveInfoVehicule = () => {
    // verif effectuées: champs vides pour tous
    // on mets le flag de vérification à true dés le départ et on le passe à false si il y a une anomalie, on récupére ensuite les id des div pour afficher les divers messages liés aux saisies obligatoires (non nulles)
    var flagOk = true;
    // adresse des div pour les messages concernant les champs non vide et url et email valide
    var messagephoto = document.getElementById("messagephoto");
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
    res = verifChampVide(images, messagephoto); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux

    if (flagOk) {
      setOpen(true); // léve le drapeau d'affichage de la boite de dialogue pour valider les données
    }
  };
  // ferme la boite d'affichage de la boite de validation des données
  const nonValid = () => {
    setOpen(false);
  };
  // ferme la boite d'affichage de la boite de validation des données et sauvegarde les données dans la BD
  const validDonneeVehicule = () => {
    setOpen(false);// ferme la boite d'affichage de la boite de validation
    // sauve les données modifiées ou pas dans un formData (sinon multer ne fonctionne pas)
    const formData = new FormData(); // formData pour envoi des données vers le serveur et ceci pour que multer puisse traiter le fichier image
    formData.append("Marque", marque);
    formData.append("Modele", modele);
    formData.append("Modeleprecis", modelePrecis);
    formData.append("Annee", annee);
    formData.append("Kilometrage", kilometrage);
    formData.append("Energie", energie);
    formData.append("Transmission", transmission);
    formData.append("Prix", prix);
    // mise en forme des données images avant envoi pour sauvegarde dans la BD
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageBlob = dataURItoBlob(image.url);
      const fileExtension = "jpeg"; // Vous pouvez remplacer cela par une logique pour extraire l'extension de l'image si nécessaire
      const imageFile = new File([imageBlob], `image${i}.${fileExtension}`, {
        type: `image/${fileExtension}`,
      });
      formData.append("images", imageFile); // ajoute les images au formdata
    }

    //dispatch(createVehicule({ data: formData }));
    dispatch(createVehicule({ data: formData })).then(() => {
      dispatch(listVehicule()); // Après la réussite de createVehicule, déclenche listVehicule pour obtenir la nouvelle liste complète de véhicules
    });// envoi les données vers la base de données pour créer le véhicule
    onClose()
  };
  //fonction permettant de transformer les donnees du fichier en fichier blob pour multer
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mimeString,
    });
  }
  // fonction de test des champs vides
  const verifChampVide = (champ, message) => {
    console.log("champ", champ);
    // récupére le champ à tester et si il est nul, affiche le message pendant 3s et renvoi false (pour les tests suivants) sinon renvoi true (champ non vide)
    // Si le champ est un tableau et a une longueur supérieure à zéro, ou si le champ est une chaîne non vide, retourne true
    if (
      (Array.isArray(champ) && champ.length > 0) ||
      (typeof champ === "string" && champ.trim() !== "")
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
      {/* zone du carroussel */}
      <div>
        <label className="file-input-container">
          Choississez un fichier
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file-input"
          />
          <div id="messagephoto" className="messagemodalevehicule"></div>
        </label>
        {images.length > 0 && (
          <div className="slider-container">
            {" "}
            <div className="slider">
              <Slider {...settings} infinite={false}>
                {images.map((item) => (
                  <img
                    key={item.id}
                    src={item.url}
                    alt={`slide-${item.id}`}
                    className="slick-image"
                  />
                ))}
              </Slider>
            </div>
          </div>
        )}
        <div id="messagephoto" className="messagemodalevehicule"></div>
      </div>
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

export default ModaleCarteVehicule;
