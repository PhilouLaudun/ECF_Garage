import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/slice/loginSlice";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

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
  // handlesubmit : routine gérant la connexion à la page partenaire après validation du profil
  const handleLogin = (e) => {
    e.preventDefault(); // evite les déclenchements secondaires dus aux parents
    console.log("credentials", credentials);
    var message = "";
    var flagValidDonnee = true;
    
    if (!isValidEmail(credentials.identifiant)) {
      flagValidDonnee = false;
      message = "L'identifiant doit être un email";
    }
    if (!credentials.mdp) {
      flagValidDonnee = false;
      message = message + "  - Le mot de passe doit être renseigné";
    }
    if (flagValidDonnee) {
      //envoi les données saisies vers le controlleur de la base de données qui effectue le test de la validaté de l'identifiant et du mot de passe
      dispatch(login(credentials)).then((res) => {
        const okay = res.payload.okay.trim().toLowerCase() === "true";
        var messageres =""
        if (okay) {

        var messagelogin = document.getElementById("messagelogin"); // récupère l'adresse dans le DOM de la div dédié au message
        messagelogin.innerHTML = "Utilisateur identifié"; // inserre le message dans le DOM et l'affiche pendant 3s
        messagelogin.style.display = "inline-block";
        setTimeout(function () {
          messagelogin.innerHTML = "";
          messagelogin.style.display = "none";
         onCancel() 
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
      <div className="titreconnexion">
        <div className="titre">Connexion</div>
        <div className="cancelconnexion">
          {" "}
          <CancelTwoToneIcon sx={iconeStyle} onClick={onCancel} />
        </div>
      </div>
      <div className="ligneconnexion">
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

      <div className="ligneconnexion">
        <div id="messagelogin" className="messagelogin"></div>
      </div>
      <div className="boutonenvoyer">
        <button
          name="boutonEnvoyer"
          type="button"
          className="bouton"
          onClick={handleLogin}
        >
          Envoyer
        </button>
      </div>
    </main>
  );
};

export default Carteconnexion;
