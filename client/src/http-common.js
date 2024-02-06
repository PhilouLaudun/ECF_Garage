// import de la focntion axios pour interroger l'API
import axios from "axios";
// crée le début de l'adresse du serveur
/*export default axios.create({
    baseURL: "http://127.0.0.1:8080/api/",// modifié  : au lieu de localhost qui semble planter le fonctionnement
    
    // content type par défaut pour des données envoyées vers le serveur sans fichier binaire dans un formData
    headers: {
        "Content-Type": "application/json"
    }
})*/
// modification http-common pour voir l'url envoyé
// Créez une instance axios avec votre configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoutez un intercepteur pour les requêtes
/*api.interceptors.request.use((config) => {
  // Log des détails de la requête
  console.log('Request URL:', config.url);
  console.log('Request Method:', config.method);
  console.log('Request Data:', config.data);

  // N'oubliez pas de retourner la configuration modifiée
  return config;
});*/

export default api;