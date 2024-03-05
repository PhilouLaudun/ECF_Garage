import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAvis,
  listeAvis,
  saveAvis,
  updateAvis,
} from "../../features/slice/blogSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import NoteIcon from "@mui/icons-material/Note";
import { Rating } from "@mui/material";

const BlogCardmod = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [approvedMessages, setApprovedMessages] = useState([]);
  const [hasLoadedDataAvis, setHasLoadedDataAvis] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.blog.message);
  const iconeStyle = {
    fontSize: "16px",
    margin: "6px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  const noteIcone = {
    fontSize: "16px",
    marginRight: "20px",
    color: "grey",
  };
  const ratingStyleCreate = {
    marginLeft: "auto",
    fontSize: "22px",
  }
    const ratingStyleValide = {
    marginLeft: "auto",
      fontSize: "16px",
    marginRight: "10px",
  }
  useEffect(() => {
    async function fetchData() {
      if (!hasLoadedDataAvis) {
        try {
          const response = await dispatch(listeAvis());
          if (response) {
            if (response.payload.okay === "false") {
              setHasLoadedDataAvis(true);
            } else {
const newPendingMessages = messages
  .filter((message) => !message.Approuve)
  .sort((a, b) => {
    const dateA = new Date(`${a.DateM} ${a.Heure}`);
    const dateB = new Date(`${b.DateM} ${b.Heure}`);
    return dateB - dateA;
  });

const newApprovedMessages = messages
  .filter((message) => message.Approuve)
  .sort((a, b) => {
    const dateA = new Date(`${a.DateM} ${a.Heure}`);
    const dateB = new Date(`${b.DateM} ${b.Heure}`);
    return dateB - dateA;
  });

              setPendingMessages(newPendingMessages);
              setApprovedMessages(newApprovedMessages);
              setHasLoadedDataAvis(true);
              localStorage.setItem("hasLoadedData", "true");
            }
          }
        } catch (error) {
          setHasLoadedDataAvis(true);
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedDataAvis, messages]);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = () => {
    if (
      newMessage.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== ""
    ) {
      setHasLoadedDataAvis(false);
      const message = {
        Nom: firstName,
        Prenom: lastName,
        DateM: new Date().toLocaleDateString(),
        Heure: new Date().toLocaleTimeString(),
        Message: newMessage,
        Approuve: false,
        Satisfaction:satisfaction,
      };
      dispatch(saveAvis({ message: message }));
      dispatch(listeAvis());
      setNewMessage("");
      setFirstName("");
      setLastName("");
      setSatisfaction(0)
    }
  };

  const handleAction = (id, action) => {
    if (action === "approve") {
      setHasLoadedDataAvis(false);
      const messageaenvoyer = {
        Approuve: true,
      };
      dispatch(updateAvis({ id: id, messageaenvoyer: messageaenvoyer })).then(
        () => {
          dispatch(listeAvis()); // Après la réussite de updateAvis, déclenche listeAvis pour obtenir la nouvelle liste complète des avis
        }
      ); // envoi les données vers la base de données pour créer l'avis

    } else {
      setHasLoadedDataAvis(false);
      dispatch(deleteAvis({ id_message: id })).then(() => {
        dispatch(listeAvis()); // Après la réussite de deleteAvis, déclenche listeAvis pour obtenir la nouvelle liste complète des avis
      }); // detruit un avis dans la base de données
    }
  };

  return (
    <div className="mainblog">
      <h2 className="titre">Avis clients</h2>
      <div className="avisvalide">
        <div>
          {approvedMessages.map((message) => (
            <div key={message.id_message}>
              <div className="lignenom">
                <span className="name">
                  <NoteIcon sx={noteIcone} /> {message.Nom} {message.Prenom}
                </span>{" "}
                - <span className="date">{message.DateM}</span>
                <Rating
                  name="read-only"
                  value={message.Satisfaction}
                  readOnly
                  sx={ratingStyleValide}
                />
              </div>

              <p className="texte">{message.Message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="newavis">
        <input
          type="text"
          value={firstName}
          onChange={(event) => handleInputChange(event, setFirstName)}
          placeholder="Prénom"
        />
        <input
          type="text"
          value={lastName}
          onChange={(event) => handleInputChange(event, setLastName)}
          placeholder="Nom"
        />
        <textarea
          value={newMessage}
          onChange={(event) => handleInputChange(event, setNewMessage)}
          placeholder="Votre message..."
        />
        <div className="rating-container">
          {" "}
          <button className="soumettre" onClick={handleSubmit}>
            Soumettre
          </button>
          <Rating
            name="controlled"
            sx={ratingStyleCreate}
            value={satisfaction}
            onChange={(event, newValue) => {
              setSatisfaction(newValue);
            }}
          />
        </div>
      </div>

      {authorized && (
        <div className="avisavalider">
          <h3>Messages en attente de validation</h3>
          <div className="messageavalider">
            {pendingMessages.map((message) => (
              <div key={message.id_message}>
                <div className="lignenom">
                  <span className="name">
                    <NoteIcon sx={noteIcone} /> {message.Nom} {message.Prenom}
                  </span>{" "}
                  - <span className="date">{message.DateM}</span>
                  <Rating
                    name="read-only"
                    value={message.Satisfaction}
                    readOnly
                    sx={ratingStyleValide}
                  />
                </div>
                <p className="texte">{message.Message}</p>
                <div>
                  <ThumbUpIcon
                    sx={iconeStyle}
                    onClick={() => handleAction(message.id_message, "approve")}
                  />
                  <ThumbDownIcon
                    sx={iconeStyle}
                    onClick={() => handleAction(message.id_message, "reject")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCardmod;
