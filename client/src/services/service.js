// import de la fonction axios pour interroger l'API
import http from "../http-common" //charge la fonction axios vers la base de données
// *********************** login *********************************
// envoi les infos sur l'utilisateur pour validation du login
const validLogin = (data) => {
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

// *********************** table prestataires *********************************
// charge la liste de tous les partenaires
const getAllPresta = () => {
    return http.get("/partenaires")
}
// crée un partenaire  avec image pour le logo 
const createPartenaireWithImg = (data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return http.post("/partenaires/withImg", data,config);
};
// crée un partenaire  sans image pour le logo 
const createPartenaireNoImg = (data) => {
  return http.post("/partenaires/withImg", data);
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
// *********************** table structure *********************************
// charge la liste de toutes les structures associées
const getAllStruct = () => { 
    return http.get("/Structures")
}
// charge la liste de toutes les structures associées à un partenaire
const getAllStructParten = (data) => {
  const queryParams = new URLSearchParams(data).toString();// on est obligé de faire cette transformation pour coller le data à l'url
   const url = `/Structures/parten?${queryParams}`; // les données contrairement à POST sont passées par l'url
  return http.get(url);
};
// met a jour une structure sans image à mettre  à jour
const updateStructureNoImg = (id, data) => {
  return http.put(`/Structures/uNoImg/${id}`, data);
};
// met a jour une structure avec image à mettre à jour
const updateStructureWithImg = (id, data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return http.put(`/Structures/uWithImg/${id}`,data,config);
};
// crée une structure avec image pour le logo 
const createStructureWithImg = (data) => {
  const config = {
    // en-tête remplacant l'en-tête par défaut quand un formData contient un champ avec un fichier binaire : IMPORTANT
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return http.post("/Structures/withImg", data, config);
};
// crée une structure sans image pour le logo 
const createStructureNoImg = (data) => {
  /* ici comme le fomData ne contient pas de fichier binaire on ne change pas l'en-tête d'envoi des données
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
  console.log("ImageLogo", data.get('ImageLogo'));*/
  return http.post("/Structures/NoImg", data);
};
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
  listUtilisateur,
  saveNewAgent,
  updateAgent,
  getAllPresta,
  updatePartenaireWithImg,
  updatePartenaireNoImg,
  createPartenaireWithImg,
  createPartenaireNoImg,
  getAllStruct,
  getAllStructParten,
  createStructureWithImg,
  createStructureNoImg,
  updateStructureNoImg,
  updateStructureWithImg,
  getImageDataFromURL,
  getAllPrestation,
  createPrestation,
  getAllStructPresta,
  createRelStructPresta,
  delRelStructPresta,
};

export default Service;
