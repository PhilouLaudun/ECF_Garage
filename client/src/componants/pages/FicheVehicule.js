import { useState } from "react";// chargement des composants react
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store
// import des composants de la page
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import SyntheseVehicule from "../composantFiche/SyntheseVehicule";
import CaracteristiqueVehicule from "../composantFiche/CaracteristiqueVehicule";
import EquipementVehicule from "../composantFiche/EquipementVehicule";
import OptionVehicule from "../composantFiche/OptionVehicule";
// import des composants mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
// import des composant du carroussel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../composantFiche/CustomArrow";
// gestion du store
import { ajoutImage, fetchImageById } from "../../features/slice/imageSlice";
import { fetchEquip } from "../../features/slice/equipementSlice";
import { fetchOpt } from "../../features/slice/optionSlice";
// import focntion externe pour afficher les images
const backendUrl = process.env.REACT_APP_BACKEND_URL; // charge l'url du serveur pour charger directement les photos à partir du serveur, fichier .env à la racine de /client
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
// composant page FicheVehicule (pas de props passées)
const FicheVehicule = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les icones de modification pour les personnes authorisées
  let id = useSelector((state) => state.vehicule.vehiculeEnCours); // récupére l'id du véhicule en cours d'affichage
  id = parseInt(id); // tranforme l'id en nombre
  const dispatch = useDispatch(); // fonction d'appel des fonctions du store
  const imagesFromStore = useSelector((state) => state.image.images); // récupére les images à afficher stockées dans le store
  const [newImages, setNewImages] = useState([]); // tableau contenant les nouvelles images pour le carroussel
  const [flagNewImages, setFlagNewImages] = useState(false); // flag pour l'ajout de nouvelles images ans le carroussel
  // style des icones sauvegarde et annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // récupére les images pour le carroussel dans la tables images, on ne teste pas la base vide car il y a par défaut des images
  useEffect(() => {
    dispatch(fetchImageById({ data: id }));
  }, [dispatch, id, flagNewImages]);

  // Fonction pour formater l'URL de l'image afin de l'afficher: transforme l'url fournie en url compatible (change \ en /) avec adresse du répertoire upload dans le serveur
  const formatImageUrl = (url) => {
    if (!url) {
      return url; // Retourner l'URL telle quelle si elle est undefined
    }
    const formattedUrl = url.replace(/\\/g, "/"); // Remplace tous les antislashes par des slashes
    return `${backendUrl}/${formattedUrl}`; // backendUrl est votre URL de backend
  };

  // récupération des données pour l'équipement et les options
  dispatch(fetchEquip()); //recupére la liste des équipement, cela permet de charger le store pour la carte equipement
  dispatch(fetchOpt()); //recupére la liste des options, cela permet de charger le store pour la carte options
  // focntion appelée quand on ajoute de nouvelles images
  const handleFileChangeCarroussel = async (event) => {
    setFlagNewImages(true); // léve le drapeau signifiant l'import de nouvelles images
    // vérifie que les images sont bien des images avant de les sauvegarder dans le tableau newImages ( voir carte modaleCarteVehicule)
    const selectedFiles = event.target.files;
    const imagesToAdd = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        const { dataURL, name } = await readFileAsBase64(file);
        const fileExtension = name.split(".").pop().toLowerCase();
        const acceptedExtensions = ["jpeg", "jpg", "png", "tiff"];

        if (acceptedExtensions.includes(fileExtension)) {
          imagesToAdd.push({ id: Date.now() + i, url: dataURL });
        } else {
          console.log("Ce fichier n'est pas une image valide:", name);
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
      }
    }
    setNewImages((prevImages) => [...prevImages, ...imagesToAdd]);
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
  // fonction de sauvegarde des nouvelles images dans la base de données
  const saveImagesToDatabase = () => {
    // Envoyer les nouvelles images au backend pour les sauvegarder dans la base de données
    const formData = new FormData(); // formData pour envoi des données vers le serveur et ceci pour que multer puisse traiter le fichier image
    for (let i = 0; i < newImages.length; i++) {
      const image = newImages[i];
      const imageBlob = dataURItoBlob(image.url);
      const fileExtension = "jpeg"; // Vous pouvez remplacer cela par une logique pour extraire l'extension de l'image si nécessaire
      const imageFile = new File([imageBlob], `image${i}.${fileExtension}`, {
        type: `image/${fileExtension}`,
      });
      formData.append("images", imageFile);
    }
    console.log("id", id);
    formData.append("fk_vehicule", id);
    // Utilisation de entries()
    for (const entry of formData.entries()) {
      console.log("entry formData",entry);
    }
    dispatch(ajoutImage({ data: formData }));
    // Réinitialiser les nouvelles images dans le state local
    setNewImages([]);
    setFlagNewImages(false);
  };
  //fonction permattant de transformer les donnees du fichier en fichier blob pour multer
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
  // permet l'affichage des images issus du back ajoutées à celles du tableau newImage, car les url sont différentes
  const allImages = [
    ...imagesFromStore.map((item) => ({
      id: item.id_photo,
      url: item.UrlPhoto.startsWith(backendUrl)
        ? item.UrlPhoto
        : formatImageUrl(item.UrlPhoto),
    })),
    ...newImages,
  ];

  return (
    <main>
      {/* En tete */}
      <Header />
      {/* Corps de la page */}
      <div className="corpFiche">
        {/* haut de la page : slider et synthése */}
        <div className="hautc">
          {/*slider  */}
          <div className="slider">
            {/* zone d'ajout des images si personne autorisée */}
            <div className="zonemodif">
              {authorized && (
                <label className="file-input-container">
                  <span>Ajouter une image</span>
                  <input
                    type="file"
                    multiple
                    className="file-input"
                    onChange={handleFileChangeCarroussel}
                  />
                </label>
              )}
              {flagNewImages && (
                <SaveTwoToneIcon
                  sx={iconeStyle}
                  onClick={saveImagesToDatabase}
                />
              )}
            </div>
            {/* zone d'affichage du carroussel */}
            <Slider {...settings} infinite={false}>
              {allImages.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={`slide-${image.id_photo}`}
                  className="slick-image"
                />
              ))}
            </Slider>
          </div>
          {/*carte synthése  */}
          <div className="synthesevehicule">
            <SyntheseVehicule id={id} />
          </div>
        </div>
        {/* bas de la page : caractéristiques, équipements et options */}
        <div className="basc">
          {/* carte caractéristiques  */}
          <div className="caracteristique">
            <CaracteristiqueVehicule id={id} />
          </div>
          {/* carte equipements  */}
          <div className="equipement">
            <EquipementVehicule id={id} />
          </div>
          {/* carte options  */}
          <div className="option">
            <OptionVehicule id={id} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default FicheVehicule;
