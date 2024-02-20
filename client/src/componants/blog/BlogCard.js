// BlogCard.js

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAvis,
  listeAvis,
  saveAvis,
  updateAvis,
} from "../../features/slice/blogSlice";

const BlogCard = () => {
  const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [pendingMessages, setPendingMessages] = useState([]);
  const [approvedMessages, setApprovedMessages] = useState([]);
  const [hasLoadedDataAvis, setHasLoadedDataAvis] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.blog.message);

  const StyledButton = styled(Button)({
    fontSize: "10px",
  });

  useEffect(() => {
    async function fetchData() {
      if (!hasLoadedDataAvis) {
        try {
          const response = await dispatch(listeAvis()); // appel du slice de chargement des données auprés de la BD;
console.log("response blog try", response); 
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedDataAvis(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides
              const newPendingMessages = messages.filter(
                (message) => !message.Approuve
              );
              const newApprovedMessages = messages.filter(
                (message) => message.Approuve
              );

              setPendingMessages(newPendingMessages);
              setApprovedMessages(newApprovedMessages);
              setHasLoadedDataAvis(true); // Marquer que les données ont été chargées
              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataAvis(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
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
      // Remettre hasLoadedData à false avant d'ajouter un nouveau message
      setHasLoadedDataAvis(false);
      const message = {
        Nom: firstName,
        Prenom: lastName,
        DateM: new Date().toLocaleDateString(), // evite les fonctions connu de style Date dans le serveur
        Heure: new Date().toLocaleTimeString(),
        Message: newMessage,
        Approuve: false,
      };
      console.log("message", message);
      dispatch(saveAvis({ message: message }));
      // Relire les données à partir de la base de données
      dispatch(listeAvis());
      setNewMessage("");
      setFirstName("");
      setLastName("");
    }
  };

  const handleAction = (id, action, message) => {
    console.log("id et action et message", id, action, message);
    if (action === "approve") {
      //update le  message avec l'identification id
      setHasLoadedDataAvis(false);
      const messageaenvoyer = {
        Approuve: true,
      };
      dispatch(updateAvis({ id: id, messageaenvoyer: messageaenvoyer }));
      dispatch(listeAvis);
    } else {
      //delete le message avec l'identificcation id
      setHasLoadedDataAvis(false);
      dispatch(deleteAvis({ id_message: id }))
        dispatch(listeAvis);
    }

    /*const updatedPendingMessages = pendingMessages
      .map((message) => {
        if (message.id === id) {
          if (action === "approve") {
            const approvedMessage = { ...message, approved: true };
            setApprovedMessages([...approvedMessages, approvedMessage]);
            return null; // Retirer le message des messages en attente de validation
          } else if (action === "reject") {
            return null;
          }
        }
        return message;
      })
      .filter(Boolean);
    setPendingMessages(updatedPendingMessages);*/
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" style={{ fontSize: "20px" }}>
          Avis clients
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h3"
              style={{ fontSize: "16px" }}
            >
              Messages validés
            </Typography>
            <div style={{ height: "300px", overflowY: "auto", width: "100%" }}>
              {approvedMessages.map((message) => (
                <div key={message.id_message}>
                  <Typography color="textSecondary" gutterBottom>
                    {message.Nom} {message.Prenom} - {message.DateM}{" "}
                    {message.Heure}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {message.Message}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Prénom"
              value={firstName}
              onChange={(event) => handleInputChange(event, setFirstName)}
              inputProps={{ style: { fontSize: 14 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nom"
              value={lastName}
              onChange={(event) => handleInputChange(event, setLastName)}
              inputProps={{ style: { fontSize: 14 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(event) => handleInputChange(event, setNewMessage)}
              placeholder="Votre message..."
              inputProps={{ style: { fontSize: 14 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
              style={{ fontSize: "10px" }}
            >
              Soumettre
            </StyledButton>
          </Grid>
          {authorized && (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h3"
                style={{ fontSize: "16px" }}
              >
                Messages en attente de validation
              </Typography>
              <div
                style={{ height: "300px", overflowY: "auto", width: "100%" }}
              >
                {pendingMessages.map((message) => (
                  <div key={message.id_message}>
                    <Typography color="textSecondary" gutterBottom>
                      {message.Nom} {message.Prenom} - {message.DateM}{" "}
                      {message.time}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {message.Message}
                    </Typography>
                    <div>
                      <IconButton
                        onClick={() =>
                          handleAction(message.id_message, "approve", message)
                        }
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleAction(message.id_message, "reject", message)
                        }
                      >
                        <ThumbDownIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
