
import images from "../../data/dataCarrousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomPrevArrow, CustomNextArrow } from "../composantFiche/CustomArrow";
import { useParams } from "react-router-dom";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import SyntheseVehicule from "../composantFiche/SyntheseVehicule";
import CaracteristiqueVehicule from "../composantFiche/CaracteristiqueVehicule";
import EquipementVehicule from "../composantFiche/EquipementVehicule";
import OptionVehicule from "../composantFiche/OptionVehicule";


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
  const { id } = useParams();


  
  return (
    <main>
      <Header />
      <div className="corpFiche">
        <div className="slider">
          <Slider {...settings}>
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
        <div className="synthesevehicule">
          <SyntheseVehicule id={id} />
        </div>
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

      <Footer />
    </main>
  );
};

export default FicheVehicule;
