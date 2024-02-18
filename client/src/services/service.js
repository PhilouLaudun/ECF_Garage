// import de la fonction axios pour interroger l'API
import http from "../http-common" //charge la fonction axios vers la base de données
// *********************** login *********************************
// envoi les infos sur l'utilisateur pour validation du login
const validLogin = (data) => {
  console.log("dataservice",data)
 return http.post("/login",data);
};
const listUtilisateur = () => { 
return http.get("/login");
}
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
// met a jour un agent
const updateAgent = (id, data) => {
  return http.put(`/login/update/${id}`, data);
};

// *********************** table vehicule *********************************
// charge la liste de tous les vehicules
const getAllVehicule = () => {
  return http.get("/vehicules");
};
// crée un vehicule  
const createVehicule = (data) => {
  console.log("createVehicule service")
  // Parcours des entrées de FormData et affichage dans la console
  for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return http.post("/vehicules/create", data, config);
};
const upadteVehicule = (id, data) => {
  for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }
  console.log("data service", data);
  return http.put(`/vehicules/update/${id}`, data);
};

// *********************** table images *********************************
// charge la liste de toutes les images associées à un vehicule
const fetchImageById = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/images/byId?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
const ajoutImage = (data) => {
  // Parcours des entrées de FormData et affichage dans la console
  /*for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }*/
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
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
  /*for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }*/
  return http.post("/caracteristiques/create", data);
};
// met à jour une nouvelle caractéristique 
const upadteCaract = (id,data) => {
  /*for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }*/
  return http.put(`/caracteristiques/update/${id}`, data);
};

// crée une structure sans image pour le logo 
/* const createStructureNoImg = (data) => {
  ici comme le fomData ne contient pas de fichier binaire on ne change pas l'en-tête d'envoi des données
  // lignes suivantes conservées si on a besoin d'afficher les données transmises par un formData
  /*console.log("id_structure", data.get('id_structure'));
  console.log("fk_parten", data.get('fk_parten'));
  console.log("Nom", data.get('Nom'));
  console.log("Logo", data.get('Logo'));
  console.log("Etat", data.get('Etat'));
  console.log("Description", data.get('Description'));
  console.log("Rue", data.get('Rue'));
  console.log("CodePostal", data.get('CodePostal'));
  console.log("Ville", data.get('Ville'));
  console.log("flagNewImage", data.get('flagNewImage'));
  console.log("ImageLogo", data.get('ImageLogo'));
  return http.post("/Structures/NoImg", data);
};*/
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
// charge la liste de toutes les equipements
const fetchOpt = () => {
  return http.get("/options");
};
// crée une nouvelle option
const createOpt = (data) => {
  return http.post("/options/create", data);
};
// *********************** table relvehiculeequipements *********************************
// charge la liste de toutes les structures associées à un partenaire
const listRelVehEquip = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/relVehiculeEquipement/list?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};

// crée un nouvel equipement
const createRelVehEquip = (data) => {
  return http.post("/relVehiculeEquipement/create", data);
};
// supprime une relation
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

// crée une nouvelle option
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
  return http.get(imageUrl, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      return response.data; // Renvoie directement les données ArrayBuffer
    })
    .catch(error => {
      console.error('Erreur lors du téléchargement de l\'image', error);
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

  getImageDataFromURL,
};

export default Service;
