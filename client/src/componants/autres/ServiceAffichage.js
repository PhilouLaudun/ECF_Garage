import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { listServices, updateServices } from "../../features/slice/serviceSlice";

const ServiceAffichage = ({ id, service }) => {
  const [hasLoadedDataServ, setHasLoadedDataServ] = useState(false);
  const role = useSelector((state) => state.utilisateur.role);
  const services = useSelector((state) => state.service.service);
  const dispatch = useDispatch();
  const [idBd, setIdBd] = useState("");
  const [image, setImage] = useState("");
  const [titre, setTitre] = useState("");
  const [texte, setTexte] = useState("");
  const [isModified, setIsModified] = useState(false);
  var classService = service === 1 ? "service1" : "service2";
  var classImg = service === 1 ? "imge1" : "imge2";
  var classText = service === 1 ? "servi1" : "servi2";

  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
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
  // Mettre à jour horairestest avec les horaires initiaux du store Redux
  useEffect(() => {
    if (hasLoadedDataServ) {
      const servicePage = services.find((service) => service.id_service === id);
      setTitre(servicePage.Titre);
      setImage(servicePage.Image);
      setTexte(servicePage.Texte);
    }
  }, [services]);
  const handleInputChange = (event) => {
    setTexte(event.target.value);
    setIsModified(true); // Lève le drapeau lorsque le champ est modifié
  };
  const abordtexteServ = () => {
    const servicePage = services.find((service) => service.id_service === id);
    setTexte(servicePage.Texte);
    setIsModified(false); // Lève le drapeau lorsque le champ est modifié
  };
  const saveMessage = () => {
    if (texte === "") {
     const servicePage = services.find((service) => service.id_service === id);
      setTexte(servicePage.Texte);
      setIsModified(false); // Lève le drapeau lorsque le champ est modifié
    } else {
      console.log("page", id, typeof id);
      console.log("message2", texte, typeof texte);
      const message = {
        Titre: titre,
        Texte:texte,
      };
      dispatch(updateServices({ id: id, message: message }));
      setIsModified(false);
    }
  };
  return (
    <main className="mainService">
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
        {hasLoadedDataServ && (
          <>
            <img className={classImg} src={image} alt="Logo" />
            <div className={classText}>
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
