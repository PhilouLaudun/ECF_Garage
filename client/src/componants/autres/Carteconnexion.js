import React, { useState } from "react";// chargement des composants react
import { useDispatch } from "react-redux";// chargement des fonction de gestion du store
// import des icones mui material
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
//import des fonctions de gestion du store
import { login } from "../../features/slice/loginSlice";
// ************************************************************************************************
// composant carteConnexion de la page home (pas de props passées)
const Carteconnexion = ({ onCancel }) => {
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
  //
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const [credentials, setCredentials] = useState({
    identifiant: "",
    mdp: "",
  }); // efface l'identifiant et le mot de passe
  // définit le style de l'input du mot de passe
  const inputStyle = {
    // Styles pour masquer l'icône "œil" dans le champ de mot de passe
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
  };
  //*********************************************************************************************
  // handlesubmit : routine gérant la connexion à l'application après validation du profil
  const handleLogin = (e) => {
    e.preventDefault(); // evite les déclenchements secondaires dus aux parents
    var message = ""; // contient le message d'erreur
    var flagValidDonnee = true; // flag de validation des données saisies
    // verification si la saisie est compatible avec le format d'un email
    if (!isValidEmail(credentials.identifiant)) {
      // email non valide
      flagValidDonnee = false;
      message = "L'identifiant doit être un email";
    }
    // verification si le mot de passe n'est  pas vide
    if (!credentials.mdp) {
      // mot de passe vide
      flagValidDonnee = false;
      message = message + "  - Le mot de passe doit être renseigné";
    }
    // action si les données sont valides ou pas
    if (flagValidDonnee) {
      //envoi les données saisies vers le controlleur de la base de données qui effectue le test de la validaté de l'identifiant et du mot de passe
      dispatch(login(credentials)).then((res) => {
        const okay = res.payload.okay.trim().toLowerCase() === "true";
        var messageres = "";
        if (okay) {
          var messagelogin = document.getElementById("messagelogin"); // récupère l'adresse dans le DOM de la div dédié au message
          messagelogin.innerHTML = "Utilisateur identifié"; // inserre le message dans le DOM et l'affiche pendant 3s
          messagelogin.style.display = "inline-block";
          setTimeout(function () {
            messagelogin.innerHTML = "";
            messagelogin.style.display = "none";
            onCancel();
          }, 3000);
        } else {
          // si identifiant ou mot de passe incorrect
          messageres = res.payload.message; // récupére le message
          console.log("messageres", messageres);
          messagelogin = document.getElementById("messagelogin"); // récupère l'adresse dans le DOM de la div dédié au message
          messagelogin.innerHTML = messageres; // inserre le message dans le DOM et l'affiche pendant 3s
          messagelogin.style.display = "inline-block";
          setTimeout(function () {
            messagelogin.innerHTML = "";
            messagelogin.style.display = "none";
          }, 3000);
        }
      });
    } else {
      var messagelogin = document.getElementById("messagelogin"); // récupère l'adresse dans le DOM de la div dédié au message
      if (message.trim() === "") {
        // Si le message est vide, masquer l'élément messagelogin
        messagelogin.style.display = "none";
      } else {
        // Si le message n'est pas vide, afficher l'élément messagelogin et insérer le message
        messagelogin.innerHTML = message;
        messagelogin.style.display = "inline-block";
        // Effacer le message après 3 secondes
        setTimeout(function () {
          messagelogin.innerHTML = "";
          messagelogin.style.display = "none";
        }, 3000);
      }
    }
  };

  // Fonction pour vérifier si une chaîne est un email valide
  function isValidEmail(email) {
    // Expression régulière pour vérifier si c'est un email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // fonction de saisies de l'identifiant et du mot de passe
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <main className="carteconnexion">
      {/* En tête */}
      <div className="titreconnexion">
        <div className="titre">Connexion</div>
        <div className="cancelconnexion">
          {" "}
          <CancelTwoToneIcon sx={iconeStyle} onClick={onCancel} />
        </div>
      </div>
      {/* Corps */}
      <div className="ligneconnexion">
        {/* Saisie du login */}
        <input
          type="text"
          id="identifiant"
          name="identifiant"
          placeholder="Identifiant"
          value={credentials.identifiant}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="ligneconnexion">
        {/* Saisie du mot de passe */}
        <input
          type="password"
          id="mdp"
          name="mdp"
          autoComplete="new-password"
          value={credentials.mdp}
          placeholder="Mot de passe"
          onChange={handleInputChange}
          style={inputStyle} // Appliquez le style à l'élément input
        ></input>
      </div>
      {/* Affichage des messages */}
      <div className="ligneconnexion">
        <div id="messagelogin" className="messagelogin"></div>
      </div>
      {/* Bouton de soumission */}
      <div className="boutonenvoyer">
        <button
          name="boutonEnvoyer"
          type="button"
          className="bouton"
          onClick={handleLogin}
        >
          Connecter
        </button>
      </div>
    </main>
  );
};

export default Carteconnexion;
