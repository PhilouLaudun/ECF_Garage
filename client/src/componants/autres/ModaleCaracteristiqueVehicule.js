import React, { useState } from "react";// chargement des composants react
import { useDispatch } from "react-redux";// chargement des fonctions de gestion du store
// import des composants mui material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import des icones mui material
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
// import des fonctions de gestion du store
import {
  createCaract,
  updateCaract,
} from "../../features/slice/caracteristiqueSlice";
//composant ModaleCaracteristiqueVehicule pour la modification des données caractéristiques d'un véhicule (props passées : caracteristique: donnée caractéristique du véhicule / flagCreation: flag signifiant la création de données/ onClose: focntion callback lors de la fermeture de la modale/ id : id du véhicule concerné)
const ModaleCaracteristiqueVehicule = ({
  caracteristique,
  flagCreation,
  onClose,
  idvehicule,
}) => {
    const dispatch = useDispatch();// fonction d'appel du store
//chargement des données à modifier ou a créer
  const [provenance, setProvenance] = useState(
    flagCreation ? "" : caracteristique.Provenance
  );// provenance
  const [miseencirculation, setMiseencirculation] = useState(
    flagCreation ? "" : caracteristique.Miseencirculation
  );//  date de mise en circulation
  const [couleur, setCouleur] = useState(
    flagCreation ? "" : caracteristique.Couleur
  );// couleur
  const [nombreporte, setNombreporte] = useState(
    flagCreation ? "" : caracteristique.Nombreporte
  );// nombres de portes
  const [nombreplace, setNombreplace] = useState(
    flagCreation ? "" : caracteristique.Nombreplace
  );//  nombres de places
  const [longueur, setLongueur] = useState(
    flagCreation ? "" : caracteristique.Longueur
  );// longueur
  const [largeur, setLargeur] = useState(
    flagCreation ? "" : caracteristique.Largeur
  );// largeur
  const [volumecoffre, setVolumecoffre] = useState(
    flagCreation ? "" : caracteristique.Volumecoffre
  );// volume du coffre
  const [puissancefiscal, setPuissancefiscal] = useState(
    flagCreation ? "" : caracteristique.Puissancefiscale
  );// puissance fiscale
  const [puissancemoteur, setPuissancemoteur] = useState(
    flagCreation ? "" : caracteristique.Puissancemoteur
  );// puissance du moteur
  const [open, setOpen] = useState(false); // open : variable contenant le drapeau d'affichage de la boite de dialogue,
  // definition du style des composants icones de sauvegarde et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    margin: "10px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
// fonction de vérification des données avant la sauvegarde
  const saveCaracteristiqueVehicule = () => {
    // verif effectuées: champs vides pour tous
    // on mets le flag de vérification à true dés le départ et on le passe à false si il y a une anomalie, on récupére ensuite les id des div pour afficher les divers messages liés aux saisies obligatoires (non nulles)
    var flagOk = true;
    // adresse des div pour les messages concernant les champs non vide et url et email valide
    var messageprovenance = document.getElementById("messageprovenance");
    var messagemiseencirculation = document.getElementById(
      "messagemiseencirculation"
    );
    var messagecouleur = document.getElementById("messagecouleur");
    var messagenombreporte = document.getElementById("messagenombreporte");
    var messagenombreplace = document.getElementById("messagenombreplace");
    var messagelongueur = document.getElementById("messagelongueur");
    var messagelargeur = document.getElementById("messagelargeur");
    var messagevolumecoffre = document.getElementById("messagevolumecoffre");
    var messagepuissancefiscal = document.getElementById(
      "messagepuissancefiscal"
    );
    var messagepuissancemoteur = document.getElementById(
      "messagepuissancemoteur"
    );
    var res = true; // res: résultat du test par la fonction
    res = verifChampVide(provenance, messageprovenance); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(miseencirculation, messagemiseencirculation); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(couleur, messagecouleur); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(nombreporte, messagenombreporte); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(nombreplace, messagenombreplace); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(longueur, messagelongueur); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(largeur, messagelargeur); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(volumecoffre, messagevolumecoffre); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(volumecoffre, messagevolumecoffre); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(puissancefiscal, messagepuissancefiscal); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    res = verifChampVide(puissancemoteur, messagepuissancemoteur); // champ nom non vide
    flagOk = flagOk && res; // AND entre le flgOk et le résultat du test, si faux, passe à faux
    if (flagOk) {
      setOpen(true); // léve le drapeau d'affichage de la boite de dialogue pour valider les données
    }
  };
  // fonction de non validation des données
  const nonValid = () => {
    setOpen(false);
  };
  // fonction de sauvegarde ou de création des données
  const validDonneeVehicule = () => {
    setOpen(false);// ferme la modale de validation des données
    // sauve les données modifiées ou pas dans un formData (sinon multer ne fonctionne pas)
    const formData = new FormData(); // formData pour envoi des données vers le serveur et ceci pour que multer puisse traiter le fichier image
    //formData.append("id_caracteristique", carte.id_partenaire); // a rajouter pour update par la suite
    formData.append("fk_vehicule", idvehicule);
    formData.append("Provenance", provenance);
    formData.append("Miseencirculation", miseencirculation);
    formData.append("Couleur", couleur);
    formData.append("Nombreporte", nombreporte);
    formData.append("Nombreplace", nombreplace);
    formData.append("Longueur", longueur);
    formData.append("Largeur", largeur);
    formData.append("Volumecoffre", volumecoffre);
    formData.append("Puissancefiscale", puissancefiscal);
    formData.append("Puissancemoteur", puissancemoteur);
// en focntion du flag, crée ou upadte un enregistrement
    if (flagCreation) {
      // si création de caractéristiques
      dispatch(createCaract({ data: formData }));
    } else {
      // si update les données
      const id = caracteristique.id_caracteristique;
      dispatch(updateCaract({ id: id, data: formData }))
        .then((response) => {
          // Traitez la réponse ici si nécessaire
          //const { data } = response.payload;
        })
        .catch((error) => {
          // Gérez les erreurs ici si nécessaire
        });
    }
    onClose() // ferme la modale de création des données et revient à la page ficheVehicule
  };

  // fonction de test des champs vides
  const verifChampVide = (champ, message) => {
    // récupére le champ à tester et si il est nul, affiche le message pendant 3s et renvoi false (pour les tests suivants) sinon renvoi true (champ non vide)
    // Si le champ est un tableau et a une longueur supérieure à zéro, ou si le champ est une chaîne non vide, retourne true
    console.log("champ", champ, typeof champ);
    if (
      champ !== undefined &&
      champ !== null &&
      champ.toString().trim() !== ""
    ) {
      return true;
    } else {
      message.innerHTML = "Ce champ doit être renseigné";
      setTimeout(function () {
        message.innerHTML = "";
      }, 3000);
      return false;
    }
  };
  //
  return (
    <main className="mainmodalecartevehicule">
      {/* zone de la Provenance du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Provenance</div>
        <input
          type="text"
          className="stylesaisie"
          value={provenance}
          placeholder="Provenance"
          onChange={(e) => {
            setProvenance(e.target.value);
          }}
        />
        <div id="messageprovenance" className="messagemodalevehicule"></div>
      </div>
      {/* zone de la Mise en circulation du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Mise en circulation</div>
        <input
          type="text"
          className="stylesaisie"
          value={miseencirculation}
          placeholder="Mise en circulation"
          onChange={(e) => {
            setMiseencirculation(e.target.value);
          }}
        />
        <div
          id="messagemiseencirculation"
          className="messagemodalevehicule"
        ></div>
      </div>
      {/* zone de la couleur du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Couleur</div>
        <input
          type="text"
          className="stylesaisie"
          value={couleur}
          placeholder="Couleur"
          onChange={(e) => {
            setCouleur(e.target.value);
          }}
        />
        <div id="messagecouleur" className="messagemodalevehicule"></div>
      </div>
      {/* zone du nombre de portes du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Nombre de portes</div>
        <input
          type="number"
          className="stylesaisie"
          value={nombreporte}
          placeholder="Nombre de portes"
          onChange={(e) => {
            setNombreporte(e.target.value);
          }}
        />
        <div id="messagenombreporte" className="messagemodalevehicule"></div>
      </div>
      {/* zone du nombre de places du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Nombre de places</div>
        <input
          type="number"
          className="stylesaisie"
          value={nombreplace}
          placeholder="Nombre de places"
          onChange={(e) => {
            setNombreplace(e.target.value);
          }}
        />
        <div id="messagenombreplace" className="messagemodalevehicule"></div>
      </div>
      {/* zone de la longueur du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Longueur (m)</div>
        <input
          type="text"
          className="stylesaisie"
          value={longueur}
          placeholder="Longueur (m)"
          onChange={(e) => {
            setLongueur(e.target.value);
          }}
        />
        <div id="messagelongueur" className="messagemodalevehicule"></div>
      </div>
      {/* zone de la largeur du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Largeur (m)</div>
        <input
          type="text"
          className="stylesaisie"
          value={largeur}
          placeholder="Largeur (m)"
          onChange={(e) => {
            setLargeur(e.target.value);
          }}
        />
        <div id="messagelargeur" className="messagemodalevehicule"></div>
      </div>
      {/* zone du volume du coffre du véhicule */}
      <div className="divdonnee">
        <div className="intitule">volume du coffre (l)</div>
        <input
          type="number"
          className="stylesaisie"
          value={volumecoffre}
          placeholder="volume du coffre (l)"
          onChange={(e) => {
            setVolumecoffre(e.target.value);
          }}
        />
        <div id="messagevolumecoffre" className="messagemodalevehicule"></div>
      </div>
      {/* zone de la puissance fiscale du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Puissance fiscale</div>
        <input
          type="number"
          className="stylesaisie"
          value={puissancefiscal}
          placeholder="Puissance fiscale"
          onChange={(e) => {
            setPuissancefiscal(e.target.value);
          }}
        />
        <div
          id="messagepuissancefiscal"
          className="messagemodalevehicule"
        ></div>
      </div>
      {/* zone de la puissance en DIN du véhicule */}
      <div className="divdonnee">
        <div className="intitule">Puissance moteur DIN</div>
        <input
          type="number"
          className="stylesaisie"
          value={puissancemoteur}
          placeholder="Puissance moteur DIN"
          onChange={(e) => {
            setPuissancemoteur(e.target.value);
          }}
        />
        <div
          id="messagepuissancemoteur"
          className="messagemodalevehicule"
        ></div>
      </div>
      {/* zone des icones */}
      <div className="iconemodif">
        <SaveTwoToneIcon
          sx={iconeStyle}
          onClick={saveCaracteristiqueVehicule}
        />
        <Dialog open={open} sx={{ zIndex: 20, display: "flex", left: "20%" }}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Etes-vous sure de vouloir valider ces modifications
          </DialogContent>
          <DialogActions>
            <Button onClick={nonValid}>Non</Button>
            <Button autoFocus onClick={validDonneeVehicule}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
        <CancelTwoToneIcon sx={iconeStyle} onClick={onClose} />
      </div>
    </main>
  );
};

export default ModaleCaracteristiqueVehicule;
