import React, { useEffect, useState } from "react"; // import des fonctions de react
import { useDispatch} from "react-redux";
// import des composants constituant la page
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"; // import du composant Mui, voir si on doit le laisser
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// Gestion du store
import { listeUtilisateur, saveNewAgent, updateAgent } from "../../features/slice/loginSlice";
// données externes contenant les qualités possible pour les agents
import { QualiteAgent } from "../../data/qualiteAgent";// import des différentes qualités possibles des agents 
// ************************************************************************************************
// composant page CarteAgentModale servant à créer ou modifier un agent (props passées: onCancel : retour quand on quitte la boite de dialogue)
export const CarteAgentModale = ({onCancel}) => {
  const dispatch = useDispatch(); // définit une fonction dispatch pour  envoyer les données dans le store
  const [listeAgent, setListeAgent] = useState([]); // tableau contenant les agents et leur données
  const [showSaveButton, setShowSaveButton] = useState(false); // flag pour afficher le bouton de sauvegarde
  const [showAddButton, setShowAddButton] = useState(true); // flag pour afficher le bouton de création d'un agent
  const [showEditButton, setShowEditButton] = useState(true); //flag pour afficher le bouton d'edition d'un agent
  const [showmodalemodif, setShowmodalemodif] = useState(false); // affichage de partie permettant de créer ou modifier un agent
  const [hasLoadedDataAgent, setHasLoadedDataAgent] = useState(false); // flag signifiant le chargement des données
  const [flagNouvelAgent, setFlagNouvelAgent] = useState(false);// flag pour  la création d'un nouvel agent
  const [open, setOpen] = useState(false); // open : variable contenant le drapeau d'affichage de la boite de dialogue devalidation des données saisies,
  const [message, setMessage] = useState(""); //  message de retour de  la base de données en cas d'erreur ou si elle est vide
  // definition du style des composants icones de sauvegarde, annulation et fermeture
  const [idUtilisateur, setIdUtilisateur] = useState("");// id de l'utilisateur
  const [nomAgent, setNomAgent] = useState("");// nom de l'utilisateur
  const [prenomAgent, setPrenomAgent] = useState("");// prénom de l'utilisateur
  const [loginAgent, setLoginAgent] = useState("");// login de l'utilisateur
  const [mdpAgent, setMdpAgent] = useState("");// mot de passe de l'utilisateur
  const [qualiteAgent, setQualiteAgent] = useState("");// qualité de l'utilisateur
  // style des icones d'édition, de sauvegarde, d'ajout et d'annulation
  const iconeStyle = {
    fontSize: "35px",
    "&:hover": {
      background: "radial-gradient(#E6E6FA, #1687A7)",
      borderRadius: "50%",
    },
  };
  // style de la zone déroulante de la qualité
  const styleZoneDeroulante = {
    width: "100%",
    height: "25px",
    padding: "10px",
    backgroundColor: "white",
    border: "1px blue solid",
    borderRadius: "20px",
    fontSize: "14px",
    textAlign: "left",
    marginTop: "0px",
  };

  // Déclare fetchData en dehors du useEffect, pour pouvoir l'utiliser hors du useefect lors du retour de la sauvegarde par exemple
  const fetchData = async () => {
    // fonction de chargement données liées à un agent
    if (!hasLoadedDataAgent) {
      //si les données n'ont pas été chargé
      try {
        //alors on charge les données
        const response = await dispatch(listeUtilisateur()); // appel du slice de chargement des données auprés de la BD pour les utilisateurs
        if (response) {
          //si on obtient une réponse
          if (response.payload.okay === "false") {
            // si le flag okay est faux c'est que la BD est vide
            // Gérer le cas où la table est vide ou pas de structure pour le partenaire donné
            setMessage(response.payload.message); //récupère le message renvoyé par le serveur (base vide ou structure absente)
            setHasLoadedDataAgent(true); // Marquer que les données ont été chargées
          } else {
            setHasLoadedDataAgent(true);// Marquer que les données ont été chargées
            setListeAgent(response.payload.data);// charge le tableau avec les données des agents
          }
        }
      } catch (error) {
        // en cas d'erreur lors de l'interrogation de la BD
        setHasLoadedDataAgent(true); // Marquer que les données ont été chargées
        setMessage(
          "Une erreur est survenue lors de la recherche des utilisateurs."
        );
      }
    }
  }; 
  // Utilise le useEffect pour appeler fetchData au montage du composant
  useEffect(() => {
    fetchData();
  }, [dispatch, hasLoadedDataAgent]);

 // routine d'édition d'un agent
  const editAgent = (id_utilisateur) => {
    // récupère l'id de l'agent
    const agentsTrouves = listeAgent.find(
      (agent) => agent.id_utilisateur === id_utilisateur
    ); // recherche l'agent dans le tableau des agents
    // charge les données concernant l'azgent sélectionné pour les afficher à l'écran et les modifier
    setIdUtilisateur(agentsTrouves.id_utilisateur); // récupére l'id de l'agent
    setNomAgent(agentsTrouves.Nom); // récupére le nom de l'agent
    setPrenomAgent(agentsTrouves.Prenom); // récupére le prénom de l'agent
    setLoginAgent(agentsTrouves.Login); // récupére le login de l'agent
    setMdpAgent(agentsTrouves.Mdp); // récupére la qualité de l'agent
    setQualiteAgent(agentsTrouves.Qualite); // récupére l'id de l'agen
    setShowmodalemodif(true); // affiche la zone de saisies des données
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowEditButton(false); // efface l'icone d'edition
    setShowAddButton(false); // efface l'icone d'ajout
    setFlagNouvelAgent(false); // baisse le flag de la création d'un nouvel agent, sert lors de la sauvegarde
    setHasLoadedDataAgent(false); // baisse le drapeau de chargement des données à partir de la base de données (est ce que cela sert à cet endroit)
  };
  // routine de création d'un nouvel agent
  const newAgent = () => {
    // efface les données concernant le nouvel agent
    setNomAgent("");
    setPrenomAgent("");
    setLoginAgent("");
    setMdpAgent("");
    setQualiteAgent(2);
    setShowmodalemodif(true); // affiche la zone de saisies des données
    setShowSaveButton(true); // affiche l'icone de sauvegarde
    setShowEditButton(false); // efface l'icone d'edition
    setShowAddButton(false); // efface l'icone d'ajout
    setFlagNouvelAgent(true); // leve le flag de la création d'un nouvel agent, sert lors de la sauvegarde
  };
  // routine de vérification des données saisies pour un agent
  const saveAgent = () => {
    var flagOk = true; // flag de vérification des données, en fin doit être ok
    var messagenom = document.getElementById("messagenomagent"); // charge l'adresse  de la div du message du nom
    var messageprenom = document.getElementById("messageprenomagent"); //charge l'adresse  de la div du message du prénom
    var messagelogin = document.getElementById("messageloginagent"); // charge l'adresse  de la div du message du login
    var messagemdp = document.getElementById("messagemdpagent"); // charge l'adresse  de la div du message du mot de passe
    var res = true; // res: résultat du test par la fonction
    res = verifChampVideAgent(nomAgent, messagenom); // test si le nom est rempli
    flagOk = flagOk && res; // AND entre le flagOk et le résultat du test, si faux, passe à faux
    res = verifChampVideAgent(prenomAgent, messageprenom);// test si le prénom est rempli
    flagOk = flagOk && res;// AND entre le flagOk et le résultat du test, si faux, passe à faux
    res = verifChampVideAgent(loginAgent, messagelogin);// test si le login est rempli
    flagOk = flagOk && res; // AND entre le flagOk et le résultat du test, si faux, passe à faux
    res = verifChampVideAgent(mdpAgent, messagemdp);// test si le mot de passe est rempli
    flagOk = flagOk && res;// AND entre le flagOk et le résultat du test, si faux, passe à faux
    if (flagOk) { //si tous les champs sont remplies
      setOpen(true); // leve le flag d'affichage de la modale d'acceptation des données
    }
  };
  // fonction de test des champs vides
  const verifChampVideAgent = (champ, message) => {
    // récupére le champ à tester et si il est nul, affiche le message pendant 3s et renvoi false (pour les tests suivants) sinon renvoi true (champ non vide)
    if (champ === "") {
      message.innerHTML = "ce champ doit être renseigné";
      setTimeout(function () {
        message.innerHTML = "";
      }, 3000);
      return false;
    } else {
      return true;
    }
  };
  // ferme la modale de confirmation des données quand on clique sur l'icone cancel de la modale de modification des données
  const nonConfirmSaveAgent = () => {
    setOpen(false); // ferme la modale de confirmation des données
  };
  // Appel de fetchData en dehors de useEffect pour raffraichir le tableau des agents aprés une mise à jour
  const refreshData = () => {
    setHasLoadedDataAgent(false);// baise le flag pour que dans fechData on lance le chargement des agents de la base de données
    fetchData();
  };
  // routine de sauvegarde des données saisies ou modifiées dans la base de données
  const confirmSaveAgent = () => {
    const formData = new FormData(); // formData pour envoi des données vers le serveur
    formData.append("id_utilisateur", idUtilisateur); // id de l'utilisateur
    formData.append("Nom", nomAgent); // Nom de l'utilisateur
    formData.append("Prenom", prenomAgent); // Prénom de l'utilisateur
    formData.append("Login", loginAgent); // Login de l'utilisateur
    formData.append("Mdp", mdpAgent); // Mot de passe de l'utilisateur
    formData.append("Qualite", qualiteAgent); // Qualité de l'utilisateur
    if (flagNouvelAgent) {
      // si c'est un nouvel agent
      dispatch(saveNewAgent({ data: formData })); // on utilise le slice et la route de création
    } else {
      dispatch(updateAgent({ id: idUtilisateur, data: formData })); // on utilise le slice et la route de la mise à jour
    }
    refreshData(); // on lance le chargement des agents à partir de la base de données après les mise à jour
    setOpen(false); // ferme la modale de confirmation des données
    setFlagNouvelAgent(false); // baisse le flag de la création d'un nouvel agent
    setShowmodalemodif(false); // efface la zone de saisie
    setShowSaveButton(false);// efface l'icone de sauvegarde
    setShowEditButton(true);// affiche l'icone d'édition d'un agent
    setShowAddButton(true);// affiche l'icone de création d'un agent
  };
// routine de modification de la zone déroulante de la qualité
  const handleChangeQualite = (event) => {
    setQualiteAgent(event.target.value);
  };
  return (
    <main className="contentModaleAgent">
      {/* en tête de la modale */}
      <div className="enteteModalAgent">
        <div className="titreModalAgent">Gestion des agents</div>
        {/* icone de fermeture de la modale */}
        <CancelTwoToneIcon
          className="escape"
          sx={iconeStyle}
          onClick={onCancel}
        />
        {/* icone d'ajout d'un agent */}
        {showAddButton && (
          <AddCircleTwoToneIcon
            className="ajoutpresta"
            sx={iconeStyle}
            onClick={newAgent}
          />
        )}
        {/* icone  de sauvegarde des données d'un agent' */}
        {showSaveButton && (
          <div>
            <SaveTwoToneIcon
              className="savepresta"
              sx={iconeStyle}
              onClick={saveAgent}
            />
            <Dialog
              open={open}
              sx={{ zIndex: 400, display: "flex", left: "20%" }}
            >
              {/* modale d'acceptation des données */}
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                Etes-vous sure de vouloir valider ces modifications
              </DialogContent>
              <DialogActions>
                <Button onClick={nonConfirmSaveAgent}>Non</Button>
                <Button autoFocus onClick={confirmSaveAgent}>
                  Oui
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
      {/* zone d'affichage des agents et de la zone de modification */}
      <div className="corpsModaleAgent">
        {/* zone d'affichage des agents */}
        <div className="listeAgent">
          <div className="titreliste">Liste des agents</div>
          {listeAgent.map((agent) => {
            return (
              <div className="lignelisteagent" key={agent.id_utilisateur}>
                <span className="spanlisteagent" key={agent.id_utilisateur}>
                  {agent.Nom} - {agent.Prenom}
                </span>
                {/* affichage de l'icone de modification d'un agent */}
                {showEditButton && (
                  <EditTwoToneIcon
                    onClick={() => editAgent(agent.id_utilisateur)}
                    sx={{
                      fontSize: "30px",
                      "&:hover": {
                        background: "radial-gradient(#E6E6FA, #1687A7)",
                        borderRadius: "50%",
                      },
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* zone d'affichage de la création ou de la modification d'un agent */}
        {showmodalemodif && (
          <div className="listeAjoutAgent">
            <div className="observation">Tous les champs sont obligatoires</div>
            {/* nom agent*/}
            <div className="designationChamps">
              <input
                type="text"
                placeholder="Nom"
                className="stylesaisie"
                value={nomAgent}
                onChange={(e) => {
                  setNomAgent(e.target.value);
                }}
              ></input>
              <div className="titrelistemodaleagent">Nom</div>
              <div
                id="messagenomagent"
                className=" messageparten messageagent"
              ></div>
            </div>
            {/* prénom agent*/}
            <div className="designationChamps">
              <input
                type="text"
                placeholder="Prénom"
                className="stylesaisie"
                value={prenomAgent}
                onChange={(e) => {
                  setPrenomAgent(e.target.value);
                }}
              ></input>
              <div className="titrelistemodaleagent">Prénom</div>
              <div
                id="messageprenomagent"
                className="messageparten messageagent"
              ></div>
            </div>
            {/* login agent*/}
            <div className="designationChamps">
              <input
                type="text"
                placeholder="Login"
                className="stylesaisie"
                value={loginAgent}
                onChange={(e) => {
                  setLoginAgent(e.target.value);
                }}
              ></input>
              <div className="titrelistemodaleagent">Login</div>
              <div
                id="messageloginagent"
                className="messageparten messageagent"
              ></div>
            </div>
            {/* mot de passe agent*/}
            <div className="designationChamps">
              <input
                type="text"
                placeholder="Mot de passe"
                className="stylesaisie"
                value={mdpAgent}
                onChange={(e) => {
                  setMdpAgent(e.target.value);
                }}
              ></input>
              <div className="titrelistemodaleagent">Mot de passe</div>
              <div
                id="messagemdpagent"
                className="messageparten messageagent"
              ></div>
            </div>
            {/* qualité agent*/}
            <div className="designationChamps">
              <Select
                value={qualiteAgent}
                onChange={handleChangeQualite}
                displayEmpty
                native
                sx={styleZoneDeroulante}
              >
                {QualiteAgent.map((qualite) => (
                  <option key={qualite.id} value={qualite.id}>
                    {qualite.qualite}
                  </option>
                ))}
              </Select>
              <div className="titrelistemodaleagent">Qualité</div>
              <div id="messagequaliteagent" className="messageparten "></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CarteAgentModale;
