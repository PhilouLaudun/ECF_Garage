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
  const sendMessage = (e) => {
    e.preventDefault();
    let nameS = document.getElementById("name"); // récupére la localisation du champ obligatoire name
    let emailS = document.getElementById("email"); // récupére la localisation du champ obligatoire  email
    let messageS = document.getElementById("message"); // récupére la localisation du champ obligatoire message
    let formMess = document.querySelector(".messagecontact"); // récupére la localisation de l'élément servant à afficher les messages d'erreur
     const isEmail = () => {
       let isMail = document.getElementById("not-mail"); // récupére la localisation indiquant un email non valide
       let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // régle concernant la validation d'un email
console.log("test email");
       if (email.match(regex)) {
         // si email conforme
         isMail.style.display = "none"; // cache le message
         return true; // renvoi true pour email valide
       } else {
         console.log("email invalide");
         isMail.style.display = "block"; // affiche le message d'email non valide

         // attend une minute avant d'effacer le messager
         setTimeout(() => {
           isMail.style.display = "none"
           isMail.style.animation = "none";
         }, 2000);
         return false; //renvoi faux pour email valide
       }
     };
    
    //name && isEmail() && message;


    if (name && isEmail() && message) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            name: name, // Example data, replace with your dynamic data
            email: email,
            message: message,
          },
          publicKey
        )
        .then((res) => {
          // si envoi OK
          formMess.innerHTML =
            "Message envoyé ! Nous vous contacterons dès que possible."; // charge le message
          formMess.style.background = "#BAEE0C"; // met le fond du message en vert
          formMess.style.opacity = "1"; // affiche le message

          nameS.classList.remove("error"); // enleve le syle error au message affiché par défaut pour le nom
          emailS.classList.remove("error"); // enleve le syle error au message affiché par défaut pour l'email
          messageS.classList.remove("error"); // enleve le syle error au message affiché par défaut pour le message
          setName(""); // efface le champ
          setEmail(""); // efface le champ
          setMessage(""); // efface le champ
          // attend 5s avant d'effacer le messsage
          setTimeout(() => {
            formMess.style.opacity = "0";
          }, 5000);
        })
        .catch((err) => {
          // si erreur d'envoi
          formMess.innerHTML = "Une erreur s'est produite, veuillez réessayer."; // charge le message
          formMess.style.background = "$red"; // met le fond du message en rouge
          formMess.style.opacity = "1"; // affiche le message
          // attend 2s avant d'effacer le messsage
          setTimeout(() => {
            formMess.style.opacity = "0";
          }, 2000);
        });
    } else {
      formMess.innerHTML = "Merci de remplir correctement les champs requis *"; // charge le message d'erreur
      formMess.style.background = "{$red}"; // met le fond du message en rouge
      formMess.style.opacity = "1"; // affiche le message
      //attend 2s avant d'effacer les messages
      setTimeout(() => {
        formMess.style.opacity = "0";
        nameS.classList.remove("error");
        emailS.classList.remove("error");
        messageS.classList.remove("error");
      }, 2000);
      if (!name) {
        // si nom non rempli
        nameS.classList.add("error"); // ajoute le syle error au message affiché par défaut pour le nom
      }
      if (!email) {
        emailS.classList.add("error"); // ajoute le syle error au message affiché par défaut pour l'email
      }
      if (!message) {
        messageS.classList.add("error"); // ajoute le syle error au message affiché par défaut pour le message
      }
    }

    /*else {
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
    }*/
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
        <label id="not-mail">Email non valide</label>
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
        <button className="boutonoccase" onDoubleClick={sendMessage}>
          Envoyer
        </button>
      </div>
      {/* zone du message si celui est vide  */}
      <div id="messageavertissement" className="messagecontact"></div>
    </main>
  );
};

export default CarteEmail;
