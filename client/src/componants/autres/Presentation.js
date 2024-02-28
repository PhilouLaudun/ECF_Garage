import React, { useEffect, useState } from 'react';// chargement des composants react
import { useDispatch, useSelector } from 'react-redux';// chargement des fonction de gestion du store
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
// import des slices
import { listPresentations, updatePresentations } from '../../features/slice/presentationSlice';
//
// composant Presentation (props passées : page : numéro de la page pour afficher le texte correspondant / largeur: definit la largeur de l'affichage)
const Presentation = ({ page, largeur }) => {
  const dispatch = useDispatch(); // fonction d'envoi des données vers les slices du store
  const largeurEcran = window.innerWidth; // récupére la largeur de l'écran
  const [hasLoadedDataPres, setHasLoadedDataPres] = useState(false); // drapeau de chargement des données
  const role = useSelector((state) => state.utilisateur.role); // role de la personne identifiée : admin ou consultant
  const presentations = useSelector((state) => state.presentation.presentation); // contient l'ensemble des données de présentation
  // initialisation des variables
  const [titre, setTitre] = useState(""); // titre de la présentation
  const [message1, setMessage1] = useState(""); // 1er message de la présentation
  const [message2, setMessage2] = useState(""); // 2eme message de la présentation, seul celui-ci est modifiable
  const [message3, setMessage3] = useState(""); // 3eme message de la présentation
  const [isModified, setIsModified] = useState(false);// drapeau signifiant des modifications dans les saisies
  // Ajoutez le style avec la largeur en pourcentage
  const largeurPresentation = {
    width: `${largeur}%`,
  };
  // Si la largeur de l'écran est inférieure à 420px, définir la largeur sur 85%
  if (largeurEcran <= 420) {
    largeurPresentation.width = "85%";
  }
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
      if (!hasLoadedDataPres) {
        try {
          const response = dispatch(listPresentations()); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedDataPres(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides

              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataPres(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataPres, presentations]);
  // Mettre à jour les données à afficher avec celles initiales du store Redux
  useEffect(() => {
    if (hasLoadedDataPres) {
      const presentationPage = presentations.find(
        (presentation) => presentation.id_presentation === page
      );
      setTitre(presentationPage.Titre);
      setMessage1(presentationPage.Message1);
      setMessage2(presentationPage.Message2);
      setMessage3(presentationPage.Message3);
    }
  }, [presentations]);
// fonction de modification lors de la saisie dans le champs message2
  const handleInputChange = (event) => {
    setMessage2(event.target.value);
    setIsModified(true); // Lève le drapeau lorsque le champ est modifié
  };
  // fonction d'annulation du message modifié
  const abordtexte = () => {
    const presentationPage = presentations.find(
      (presentation) => presentation.id_presentation === page
    );
    setMessage2(presentationPage.Message2);
    setIsModified(false); // Lève le drapeau lorsque le champ est modifié
  };
  //fonction de sauvegarde du message modifié
  const saveMessage = () => {
    if (message2 === "") {
      const presentationPage = presentations.find(
        (presentation) => presentation.id_presentation === page
      );
      setMessage2(presentationPage.Message2);
    } else {
      const message = {
        Titre: titre,
        Message1: message1,
        Message2: message2,
        Message3: message3,
      };
      dispatch(updatePresentations({ id: page, message: message }));
      setIsModified(false);
    }
  };

  return (
    <main className="mainPresentation" style={largeurPresentation}>
      {/* si message modifié et admin, on affiche les icones de sauvegarde ou d'annulation */}
      {isModified && role === 1 && (
        <div className="iconContainer">
          <SaveTwoToneIcon
            sx={iconeStyle}
            onClick={saveMessage}
          ></SaveTwoToneIcon>
          <CancelTwoToneIcon sx={iconeStyle} onClick={abordtexte} />
        </div>
      )}
      {/* quand les données sont chargées*/}
      {hasLoadedDataPres && (
        <>
          {/* affichage titre*/}
          <div className="titrepresentation">{titre}</div>
                    {/* affichage messages*/}
          <div className="messagepresentation">
            {message1 && <div>{message1}</div>}
          </div>
          <div
            className={`messagepresentation ${role === 1 ? "editable" : ""}`}
          >
            {/* on ne met pas de condition sur ce message car à la saisie si on supprime le message existant cela fait disparaitre le textarea */}
            <textarea
              value={message2}
              onChange={handleInputChange}
              rows={5} // Ajustez le nombre de lignes en fonction de vos besoins
              cols={100} // Ajustez le nombre de colonnes en fonction de vos besoins
              disabled={role !== 1}
            />
          </div>
          <div className="messagepresentation">
            {message3 && <div>{message3}</div>}
          </div>
        </>
      )}
    </main>
  );
};

export default Presentation