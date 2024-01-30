import React, { useState } from "react"; // import des fonctions de react
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import emailjs from "emailjs-com"; // Import de la librairie emailjs

// composant CarteEmail  de la page structure (props passées: onCancel: pour fermer la boite de dialogue)
const CarteEmail = (props) => {
  // style de icone de fermeture et d'envoi
  const iconeStyle = {
    fontSize: "30px",
    transition: "transform 0.3s, background 0.3s, border-radius 0.3s", // Ajoute une transition pour une animation fluide
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
      transform: "scale(1.4)", // Déplace l'icône vers le haut au survol
    },
  };
  const onCancel = props.onCancel; // fonction de retour lors de la fermeture de la modale
  const [name, setName] = useState(""); // variable contenant le nom de la personne envoyant le message
  const [email, setEmail] = useState(""); // variable contenant l'email de la personne envoyant le message
  const [message, setMessage] = useState(""); // message d'erreur
  const serviceId = "service_3b23au8"; // variable contenant le numéro d'identification pour emailjs
  const templateId = "template_19udd2q"; // variable contenant le numéro d'identification pour emailjs
  const publicKey = "user_wycCeh0xbzJrIlAiWMPQA"; // clé pour email.js
  const recipientEmail = "philippe.boudinaud@orange.fr"; // pour envoyer vers un autre destinataire il faut rajouter {{to_email}} dans le champ To EMail du template sinon cela laisse l'adresse par défaut. Cela implique que si on veut utiliser une adresse d'un partenaire, on charge recipientEmail avec cette adresse et on modifie le champ du template. Voir on crée un nouveau template
  const [sendStatus, setSendStatus] = useState(null); // variable définissant le status de l'envoi
  var messageavertissement = document.getElementById("messageavertissement"); // adresse de la div d'affichage du message
  const sendMessage = () => {
    if (message === "") {
      messageavertissement.innerHTML = "le message doit être renseigné";
      setTimeout(function () {
        messageavertissement.innerHTML = "";
      }, 3000);
    } else {
      // envoi du mail
      emailjs
        .send(
          serviceId,
          templateId,
          {
            name: "Philippe BOUDINAUD", // Example data, replace with your dynamic data
            company: "Maison",
            phone: "1234567890",
            email: "philougard@gmail.com",
            message: message,
            to_email: recipientEmail,
          },
          publicKey
        )
        .then(
          (response) => {
            setSendStatus("success");
          },
          (error) => {
            setSendStatus("error");
          }
        );
    }
  };

  return (
    <main className="carteEmail">
      {/* zone de saisie du message  */}
      <input
        type="text"
        id="name"
        name="name"
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="nom *"
        value={name}
      />
      <div className="email-content">
        <input
          type="mail"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email *"
          value={email}
        />
      </div>
      <textarea
        id="message"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message *"
        value={message}
        required
      />
      <div className="zonebouton">
        <button className="boutonoccase">Envoyer</button>
      </div>

      {/* zone du message si celui est vide  */}
      <div id="messageavertissement" className="messageparten"></div>
    </main>
  );
};

export default CarteEmail;
