import ConstructionIcon from "@mui/icons-material/Construction";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import NoCrashIcon from "@mui/icons-material/NoCrash";
const dataCarteService = [
  {
    id: 1,
    titre: "ENTRETIEN ET REVISION",
    message:
      "Une équipe professionnelle, formée aux dernières technologies ( Expert ZE, Hybride...) vous accueille pour assurer la maintenance de votre voiture: vidange, filtres, freinage, batterie, pneus, kit de distribution.",
    icone: ConstructionIcon,
  },
  {
    id: 2,
    titre: "VEHICULES D'OCCASIONS",
    message:
      "Un parc de plus de 100 véhicules d'occasion pour trouver votre future voiture. ",
    icone: NoCrashIcon,
  },
  {
    id: 3,
    titre: "CARROSSERIE",
    message:
      "Agréé par les principales assurances, nous réalisons toutes les opérations de réparation, peinture et vitrage.",
    icone: CarRepairIcon,
  },
  {
    id: 4,
    titre: "AUTRES SERVICES",
    message:
      "Pré-contrôle et contrôle technique, service de carte grise, lavage professionnel.",
    icone: LocalCarWashIcon,
  },
];

export default dataCarteService;
