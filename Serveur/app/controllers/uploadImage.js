const multer = require("multer");
const path = require("path");
// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extname = path.extname(file.originalname);
        cb(null, uniqueSuffix + extname);
    },
});

// Filtre des types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  // Affichage des informations sur le fichier
  //console.log("Informations sur le fichier :", file);
};

// Configuration de l'upload avec Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
// Middleware pour gérer l'upload d'une seule image
const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("images");

// Middleware pour afficher les données reçues, ne sert que pour le developpement
function logReceivedData(req, res, next) {
    console.log("Données reçues du frontend  :", req.body);
    console.log("file recu du frontend",req.file)
    next();
}


module.exports = {
    logReceivedData,
    uploadImage
};