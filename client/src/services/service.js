// import de la fonction axios pour interroger l'API
import http from "../http-common"; //charge la fonction axios vers la base de données
// *********************** login *********************************
// envoi les infos sur l'utilisateur pour validation du login
const validLogin = (data) => {
  return http.post("/login", data);
};
// charge la liste de tous les utilisateurs
const listUtilisateur = () => {
  return http.get("/login");
};
// sauvegarde d'un utilisateur
const saveNewAgent = (data) => {
  // je laisse les parties config et affichage des clés et valeur du formdata pour mémoire. Pour formdata, cela permet d'afficher les données du formdata. Pour config, ici comme il n'y a pas de fichier transmis, on à pas besoin de modifier le Content-Type en ultipart/form-data
  /*const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };*/
  return http.post("/login/create", data);
};
// met a jour un uilisateur
const updateAgent = (id, data) => {
  return http.put(`/login/update/${id}`, data);
};
// *********************** table blog *********************************
// charge la liste de tous les avis
const listeAvis = () => {
  return http.get("/blog");
};
// sauvegarde un avis
const saveAvis = (message) => {
  // je laisse les parties config et affichage des clés et valeur du formdata pour mémoire. Pour formdata, cela permet d'afficher les données du formdata. Pour config, ici comme il n'y a pas de fichier transmis, on à pas besoin de modifier le Content-Type en ultipart/form-data
  /*const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };*/
  return http.post("/blog/create", message);
};
// met a jour d'un avis
const updateAvis = (id, messageaenvoyer) => {
  return http.put(`/blog/update/${id}`, messageaenvoyer);
};
// suprime un avis
const deleteAvis = (id_message) => {
  return http.delete(`/blog/delete/${id_message}`);
};
// *********************** table horaires *********************************
// charge la liste de tous les horaires
const listeHoraires = () => {
  return http.get("/horaire");
};
// met a jour les horaires
const updateHoraires = (horairesModif) => {
  return http.put(`/horaire/update`, horairesModif);
};
// *********************** table presentations *********************************
// charge la liste des présenatations de page
const listPresentations = () => {
  return http.get("/presentation");
};

// met a jour une présentation
const updatePresentations = (id, message) => {
  return http.put(`/presentation/update/${id}`, message);
};
// *********************** table services *********************************
// charge la liste de tous les services
const listServices = () => {
  return http.get("/service");
};
// met a jour un service
const updateServices = (id, message) => {
  return http.put(`/service/update/${id}`, message);
};
// *********************** table vehicule *********************************
// charge la liste de tous les vehicules
const getAllVehicule = () => {
  return http.get("/vehicules");
};
// crée un vehicule
const createVehicule = (data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return http.post("/vehicules/create", data, config);
};
// met à jour un vehicule
const upadteVehicule = (id, data) => {
  return http.put(`/vehicules/update/${id}`, data);
};

// *********************** table images *********************************
// charge la liste de toutes les images associées à un vehicule
const fetchImageById = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/images/byId?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// ajoute des images
const ajoutImage = (data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log("data service", data);
        for (const entry of data.entries()) {
          console.log("entry formData service", entry);
        }
  return http.post("/images/ajout", data, config);
};
// *********************** table caracteristiques *********************************
// charge la liste des caracteristiques associées à un vehicule
const fetchCaractById = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/caracteristiques/byId?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// crée une nouvelle caractéristique
const createCaract = (data) => {
  return http.post("/caracteristiques/create", data);
};
// met à jour une nouvelle caractéristique
const upadteCaract = (id, data) => {
  return http.put(`/caracteristiques/update/${id}`, data);
};
// *********************** table equipement *********************************
// charge la liste de toutes les equipements
const fetchEquip = () => {
  return http.get("/equipements");
};
// crée un nouvel equipement
const createEquip = (data) => {
  return http.post("/equipements/create", data);
};
// *********************** table option *********************************
// charge la liste de toutes les options
const fetchOpt = () => {
  return http.get("/options");
};
// crée une nouvelle option
const createOpt = (data) => {
  return http.post("/options/create", data);
};
// *********************** table relvehiculeequipements *********************************
// charge la liste de tous les équipements associées à un vehicule
const listRelVehEquip = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/relVehiculeEquipement/list?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};

// crée un nouvel relation equipement pour un vehicule
const createRelVehEquip = (data) => {
  return http.post("/relVehiculeEquipement/create", data);
};
// supprime une relation pour un vehicule
const delRelVehEquip = (id_relVehEquip) => {
  return http.delete(`/relVehiculeEquipement/${id_relVehEquip}`);
};
// *********************** table relvehiculeoptions *********************************
// charge la liste de toutes les options associées à un vehicule
const listRelVehOpt = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/relVehiculeOption/list?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// crée une nouvelle relation option pour un vehicule
const createRelVehOpt = (data) => {
  return http.post("/relVehiculeOption/create", data);
};
// supprime une relation
const delRelVehOpt = (id_relVehOpt) => {
  return http.delete(`/relVehiculeOption/${id_relVehOpt}`);
};
// *********************** récupération données binaire image sur serveur répertoire upload *********************************
// fonction utilisée pour récuperer l'image du logo d'un prestataire dans le répertoire upload
const getImageDataFromURL = (imageUrl) => {
  return http
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      return response.data; // Renvoie directement les données ArrayBuffer
    })
    .catch((error) => {
      console.error("Erreur lors du téléchargement de l'image", error);
      throw error;
    });
};

// variable pour l'appel dans les autres modules
const Service = {
  validLogin,
  getAllVehicule,
  createVehicule,
  upadteVehicule,
  listUtilisateur,
  fetchImageById,
  fetchCaractById,
  createCaract,
  upadteCaract,
  createEquip,
  fetchEquip,
  createRelVehEquip,
  listRelVehEquip,
  delRelVehEquip,
  listRelVehOpt,
  createRelVehOpt,
  delRelVehOpt,
  fetchOpt,
  createOpt,
  ajoutImage,
  saveNewAgent,
  updateAgent,
  listeAvis,
  saveAvis,
  updateAvis,
  deleteAvis,
  listeHoraires,
  updateHoraires,
  listPresentations,
  updatePresentations,
  listServices,
  updateServices,
  getImageDataFromURL,
};

export default Service;
