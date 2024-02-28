import React, { useEffect, useState } from "react";// chargement des composants react
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store 
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
// import des slices
import { listServices, updateServices } from "../../features/slice/serviceSlice";
//
// composant ServiceAffichage (props passées : id : numéro de la page pour afficher le texte correspondant / service: dert à définir les positions d'affichage de la photo et du texte : 1 photo-texte : 2 texte-photo)
const ServiceAffichage = ({ id, service }) => {
  const dispatch = useDispatch(); // fonction d'envoi des données vers les slices du store
  const [hasLoadedDataServ, setHasLoadedDataServ] = useState(false); // drapeau de chargement des données
  const role = useSelector((state) => state.utilisateur.role); // role de la personne identifiée : admin ou consultant
  const services = useSelector((state) => state.service.service); // contient l'ensemble des données des services
  // initialisation des variables
  const [image, setImage] = useState(""); // image à afficher
  const [titre, setTitre] = useState(""); // titre du service
  const [texte, setTexte] = useState(""); // texte du sertvice
  const [isModified, setIsModified] = useState(false); // drapeau signifiant des modifications dans les saisies
  var classService = service === 1 ? "service1" : "service2"; // charge en fonction de service la classe pour modifier la position texte-photo (utilisation d'un grid différent)
  var classImg = service === 1 ? "imge1" : "imge2"; // charge en fonction de service la classe pour modifier la position de la photo
  var classText = service === 1 ? "servi1" : "servi2"; // charge en fonction de service la classe pour modifier la position du texte
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // useEffect de chargement des données à partir de la BD
  useEffect(() => {
    async function fetchData() {
      if (!hasLoadedDataServ) {
        try {
          const response = dispatch(listServices()); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedDataServ(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides

              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataServ(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataServ, services]);
  // Mettre à jour les données à afficher avec celles initiales du store Redux
  useEffect(() => {
    if (hasLoadedDataServ) {
      const servicePage = services.find((service) => service.id_service === id);
      setTitre(servicePage.Titre);
      setImage(servicePage.Image);
      setTexte(servicePage.Texte);
    }
  }, [services]);
  // fonction de modification lors de la saisie dans le champs texte
  const handleInputChange = (event) => {
    setTexte(event.target.value);
    setIsModified(true); // Lève le drapeau lorsque le champ est modifié
  };
  // fonction d'annulation du texte modifié
  const abordtexteServ = () => {
    const servicePage = services.find((service) => service.id_service === id);
    setTexte(servicePage.Texte);
    setIsModified(false); // Lève le drapeau lorsque le champ est modifié
  };
  //fonction de sauvegarde du texte modifié
  const saveMessage = () => {
    if (texte === "") {
      const servicePage = services.find((service) => service.id_service === id);
      setTexte(servicePage.Texte);
      setIsModified(false); // Lève le drapeau lorsque le champ est modifié
    } else {
      const message = {
        Titre: titre,
        Texte: texte,
      };
      dispatch(updateServices({ id: id, message: message }));
      setIsModified(false);
    }
  };
  return (
    <main className="mainService">
      {/* si message modifié et admin, on affiche les icones de sauvegarde ou d'annulation */}
      {isModified && role === 1 && (
        <div className="iconContainer">
          <SaveTwoToneIcon
            sx={iconeStyle}
            onClick={saveMessage}
          ></SaveTwoToneIcon>
          <CancelTwoToneIcon sx={iconeStyle} onClick={abordtexteServ} />
        </div>
      )}
      <div className={classService}>
        {/* quand les données sont chargées*/}
        {hasLoadedDataServ && (
          <>
            {/* affichage photo*/}
            <img className={classImg} src={image} alt="Logo" />
            {/* affichage titre et texte*/}
            <div className={classText}>
              {/* affichage titre*/}
              <div className="titreService">{titre}</div>
              <div
                className={`messageservice ${
                  role === 1 ? "editableservice" : ""
                }`}
              >
                {/* on ne met pas de condition sur ce message car à la saisie si on supprime le message existant cela fait disparaitre le textarea */}
                <textarea
                  value={texte}
                  onChange={handleInputChange}
                  rows={5} // Ajustez le nombre de lignes en fonction de vos besoins
                  cols={100} // Ajustez le nombre de colonnes en fonction de vos besoins
                  disabled={role !== 1}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ServiceAffichage;
