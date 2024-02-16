import images from "../../data/dataCarrousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../composantFiche/CustomArrow";
import { useParams } from "react-router-dom";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import SyntheseVehicule from "../composantFiche/SyntheseVehicule";
import CaracteristiqueVehicule from "../composantFiche/CaracteristiqueVehicule";
import EquipementVehicule from "../composantFiche/EquipementVehicule";
import OptionVehicule from "../composantFiche/OptionVehicule";
import AuthorizedActionsComponent from "../autres/AuthorizedActionsComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchImageById } from "../../features/slice/imageSlice";
import { useEffect } from "react";
import { fetchEquip } from "../../features/slice/equipementSlice";
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
  //let { id } = useParams();
  let id = useSelector(state => state.vehicule.vehiculeEnCours)
  id = parseInt(id); // tranforme l'id en nombre, car l'id envoyé par Navigate est modifié en string
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  // récupére les images pour le carroussel dans la tables images, on ne teste pas la base vide car il y a par défaut des images
  useEffect(() => {
    dispatch(fetchImageById({ data: id }));
  }, [dispatch, id]);
  // Fonction pour formater l'URL de l'image afin de l'afficher: transforme l'url fournie en url compatible (change \ en /) avec adresse du répertoire upload dans le serveur
  const formatImageUrl = (url) => {
    const formattedUrl = url.replace(/\\/g, "/"); // Remplace tous les antislashes par des slashes
    return `${backendUrl}/${formattedUrl}`; // backendUrl est votre URL de backend
  };
  //

  dispatch(fetchEquip()); //recupére la liste des équipement, cela permet de charger le store pour les cartes
  //sauvegarde DOM

  /*  
        
       */
  return (
    <main>
      <Header />
      <div className="corpFiche">
        <div className="hautc">
          {" "}
          <div className="slider">
            <Slider {...settings} infinite={false}>
              {images.map((item) => (
                <img
                  key={item.id_photo}
                  src={formatImageUrl(item.UrlPhoto)}
                  alt={`slide-${item.id_photo}`}
                  className="slick-image"
                />
              ))}
            </Slider>
          </div>
          <div className="synthesevehicule">
            <div className="container-synthese">
              <SyntheseVehicule id={id} />
              <div className="gestion-synthese">gestion</div>
            </div>
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
