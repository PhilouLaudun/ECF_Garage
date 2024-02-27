import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listPresentations, updatePresentations } from '../../features/slice/presentationSlice';
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
const Presentation = ({ page, largeur }) => {
  const largeurEcran = window.innerWidth;
  //var presentation = textePresentation[page - 1];
  const [hasLoadedDataPres, setHasLoadedDataPres] = useState(false);
  const role = useSelector((state) => state.utilisateur.role);
  const presentations = useSelector((state) => state.presentation.presentation);
  const dispatch = useDispatch();
  const [titre, setTitre] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [isModified, setIsModified] = useState(false);
  // Ajoutez le style avec la largeur en pourcentage
  const largeurPresentation = {
    width: `${largeur}%`,
  };

  // Si la largeur de l'écran est inférieure à 420px, définir la largeur sur 100%
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
  // Mettre à jour horairestest avec les horaires initiaux du store Redux
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

  const handleInputChange = (event) => {
    setMessage2(event.target.value);
    setIsModified(true); // Lève le drapeau lorsque le champ est modifié
  };
  const abordtexte = () => {
    const presentationPage = presentations.find(
      (presentation) => presentation.id_presentation === page
    );
    setMessage2(presentationPage.Message2);
    setIsModified(false); // Lève le drapeau lorsque le champ est modifié
  }
  const saveMessage = () => { if (message2 === "") {
          const presentationPage = presentations.find(
            (presentation) => presentation.id_presentation === page
          );
    setMessage2(presentationPage.Message2);
  } else {
    console.log("page", page, typeof page)
    console.log("message2", message2, typeof message2)
    const message = {
      Titre: titre,
      Message1: message1,
      Message2: message2,
      Message3: message3,
    }
    dispatch(updatePresentations({ id: page, message: message }));
    setIsModified(false);
    
  }}
  
  return (
    <main className="mainPresentation" style={largeurPresentation}>
      {isModified && role === 1 && (
        <div className="iconContainer">
          <SaveTwoToneIcon
            sx={iconeStyle}
            onClick={saveMessage}
          ></SaveTwoToneIcon>
          <CancelTwoToneIcon sx={iconeStyle} onClick={abordtexte} />
        </div>
      )}
      {hasLoadedDataPres && (
        <>
          <div className="titrepresentation">{titre}</div>
          <div className="messagepresentation">
            {message1 && <div>{message1}</div>}
          </div>
          <div className={`messagepresentation ${role === 1 ? 'editable' : ''}`}>
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