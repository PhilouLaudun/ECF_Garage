import React, { useRef, useState } from "react"; // import des fonctions de react
import { useDispatch } from "react-redux";// chargement des fonctions de gestion du store
// import des icones mui material
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
// import des fonctions de gestion du store
import { createEquip } from "../../features/slice/equipementSlice";
// composant NewPrestation (props passées: listeEquipement : contient la liste de tous les équipements proposés )
const NewEquipement = ({ listeEquipement }) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  // composant affichant un input et une croix pour la saisie d'un nouvel equipement
  const [valeurInput, setValeurInput] = useState(""); // récupére la valeur saisie dans l'input, on verra à traiter les doublons par la suite
    const inputRef = useRef(null);
// fonction de sauvegarde d'un nouvel équipement
  const nouvelEquipement = () => {
    // si la saisie est vide on affiche le message pour signifier que l'input doit etre renseigné
    if (valeurInput === "") {
      var messageres = "Valeur nulle non acceptée";
      var messagenewpresta = document.getElementById("messagenewEO");
      messagenewpresta.innerHTML = messageres;
      setTimeout(function () {
        messagenewpresta.innerHTML = "";
      }, 3000);
    } else {
      // on teste si la valeur saisie existe déja dans les prestations (test en minuscule : Boisson = boisson), si exist déja on affiche le message pour signifier que la prestation existe sinon on sauvegarde la nouvelle prestation
      console.log("valeurInput", valeurInput, typeof valeurInput);
      var valeurInputLowerCase = valeurInput.toLowerCase(); // Convertir en minuscules
      var doublon = listeEquipement.some(function (equipement) {
        return equipement.Equipement.toLowerCase() === valeurInputLowerCase;
      });
      if (doublon) { //  si equipement déja existant
        messageres = "Cet equipement existe déja";
        messagenewpresta = document.getElementById("messagenewEO");
        messagenewpresta.innerHTML = messageres;
        setValeurInput("")
        setTimeout(function () {
          messagenewpresta.innerHTML = "";
          // Réinitialisation de la valeur de l'entrée en utilisant la référence React
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }, 3000);
      } else {// si nouvel équipement
 
          const reponse = dispatch(createEquip({ data: valeurInput })); // crée la nouvelle prestation} 
console.log("réponse",reponse)
      }
      
    }
  };
  return (
    <main className="newEO">
      <div className="bouton">
        {/* zone de saisie d'un équipement */}
        <div className="zoneinput">
          {/* zone de saisie */}
          <input
            type="text"
            placeholder="nouvel equipement"
            valeur={valeurInput}
            onChange={(e) => {
              setValeurInput(e.target.value);
            }}
            ref={inputRef}
          ></input>
          {/* icone d'ajout  */}
          <AddCircleTwoToneIcon
            onClick={nouvelEquipement}
            sx={{
              fontSize: "25px",
            }}
          />
        </div>
      </div>
      {/* zone d'affichage du message de saisie nulle   */}
      <div id="messagenewEO" className="messagenewEO"></div>
    </main>
  );
};
export default NewEquipement;
