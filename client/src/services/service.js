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
  console.log("service:getAllVehicule")
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
// met a jour un partenaire avec image pour le logo 
const updatePartenaireWithImg = (id, data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return http.put(`/partenaires/uWithImg/${id}`,data,config);
};
// met a jour un partenaire sans image pour le logo 
const updatePartenaireNoImg = (id, data) => {
  return http.put(`/partenaires/uNoImg/${id}`, data);
};
// *********************** table images *********************************
// charge la liste de toutes les images associées à un vehicule
const fetchImageById = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/images/byId?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// *********************** table caracteristiques *********************************
// charge la liste des caracteristiques associées à un vehicule
const fetchCaractById = (data) => {
  console.log("data service",data)
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/caracteristiques/byId?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// charge la liste de toutes les images associées à un vehicule
const createCaract = (data) => {
  for (const entry of data.entries()) {
    console.log(entry[0] + ":", entry[1]);
  }
  console.log("data service", data);
  return http.post("/caracteristiques/create", data);
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
// *********************** table prestation *********************************
// charge la liste de toutes les structures associées au partenaires
const getAllPrestation = () => { 
  return http.get("/prestations")
}
// crée une nouvelle prestation
const createPrestation = (data) => { 
  console.log("service : createPrestation", data);
  return http.post("/prestations", data);
}
// *********************** table relStructPresta *********************************
// charge la liste de toutes les structures associées à un partenaire
const getAllStructPresta = (data) => {
  const queryParams = new URLSearchParams(data).toString(); // on est obligé de faire cette transformation pour coller le data à l'url
  const url = `/RelStructPresta/presta?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};

// crée une nouvelle relation
const createRelStructPresta = (data) => {
  console.log("service : data ",data)
  return http.post("/RelStructPresta", data);
};
// supprime une relation
const delRelStructPresta = (id_relStructPresta) => {
  console.log(
    "service : id_relStructPresta ",
    id_relStructPresta,
    typeof id_relStructPresta
  );
  return http.delete(`/RelStructPresta/${id_relStructPresta}`);
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
  listUtilisateur,
  fetchImageById,
  fetchCaractById,
  createCaract,
  saveNewAgent,
  updateAgent,
  updatePartenaireWithImg,
  updatePartenaireNoImg,

  getImageDataFromURL,
  getAllPrestation,
  createPrestation,
  getAllStructPresta,
  createRelStructPresta,
  delRelStructPresta,
};

export default Service;
