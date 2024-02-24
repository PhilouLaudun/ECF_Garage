
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../composantFiche/CustomArrow";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import SyntheseVehicule from "../composantFiche/SyntheseVehicule";
import CaracteristiqueVehicule from "../composantFiche/CaracteristiqueVehicule";
import EquipementVehicule from "../composantFiche/EquipementVehicule";
import OptionVehicule from "../composantFiche/OptionVehicule";
import { useDispatch, useSelector } from "react-redux";
import { ajoutImage, fetchImageById } from "../../features/slice/imageSlice";
import { useEffect } from "react";
import { fetchEquip } from "../../features/slice/equipementSlice";
import { fetchOpt } from "../../features/slice/optionSlice";
import { useState } from "react";
const backendUrl = process.env.REACT_APP_BACKEND_URL; // charge l'url du serveur pour charger directement les photos à partir du serveur, fichier .env à la racine de /client

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const FicheVehicule = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  let id = useSelector((state) => state.vehicule.vehiculeEnCours);
  id = parseInt(id); // tranforme l'id en nombre, car l'id envoyé par Navigate est modifié en string
  const dispatch = useDispatch();
  const imagesFromStore = useSelector((state) => state.image.images);
  const [newImages, setNewImages] = useState([]);
  const [flagNewImages, setFlagNewImages] = useState(false);
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  //const images = useSelector((state) => state.image.images);
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

  //

  dispatch(fetchEquip()); //recupére la liste des équipement, cela permet de charger le store pour les cartes
  dispatch(fetchOpt()); //recupére la liste des options, cela permet de charger le store pour les cartes

  const handleFileChangeCarroussel = async (event) => {
    setFlagNewImages(true);
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
    console.log("imagesToAdd:", imagesToAdd);
    setNewImages((prevImages) => [...prevImages, ...imagesToAdd]);
  };
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
  const saveImagesToDatabase = () => {
    // Envoyer les nouvelles images au backend pour les sauvegarder dans la base de données
    const formData = new FormData(); // formData pour envoi des données vers le serveur et ceci pour que multer puisse traiter le fichier image
    formData.append("id_vehicule", id);
    for (let i = 0; i < newImages.length; i++) {
      const image = newImages[i];
      const imageBlob = dataURItoBlob(image.url);
      const fileExtension = "jpeg"; // Vous pouvez remplacer cela par une logique pour extraire l'extension de l'image si nécessaire
      const imageFile = new File([imageBlob], `image${i}.${fileExtension}`, {
        type: `image/${fileExtension}`,
      });
      formData.append("images", imageFile);
    }
    // Parcours des entrées de FormData et affichage dans la console
    /*for (const entry of formData.entries()) {
      console.log("visu formdata",entry[0] + ":", entry[1]);
    }*/
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
  const allImages = [
    ...imagesFromStore.map((item) => ({
      id: item.id_photo,
      url: item.UrlPhoto.startsWith(backendUrl)
        ? item.UrlPhoto
        : formatImageUrl(item.UrlPhoto),
    })),
    ...newImages,
  ];

  //sauvegarde DOM

  /*
   */
  return (
    <main>
      <Header />
      <div className="corpFiche">
        <div className="hautc">
          <div className="slider">
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
          <div className="synthesevehicule">
            <SyntheseVehicule id={id} />
          </div>
        </div>
        <div className="basc">
          {" "}
          <div className="caracteristique">
            <CaracteristiqueVehicule id={id} />
          </div>
          <div className="equipement">
            <EquipementVehicule id={id} />
          </div>
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
