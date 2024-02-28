import React from "react";// chargement des composants react
import { useNavigate } from "react-router-dom"; // fonction pour naviguer entre les pages
import { useDispatch } from "react-redux"; // fonction de gestion du store
// import des composant mui material
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import des focntion de gestion du store
import { setVehiculeEnCours } from "../../features/slice/vehiculeSlice";
// import de focntion externe
const backendUrl = process.env.REACT_APP_BACKEND_URL; // charge l'url du serveur pour charger directement les photos à partir du serveur, fichier .env à la racine de /client
// composant carte des véhicules (props passées : vehicule : données du véhiucle à afficher)
const CarteVehicule = ({ vehicule }) => {
  const navigate = useNavigate(); // fonction de navigation vers les pages
  const dispatch = useDispatch(); // fonction d'appel des focntions du store
  // style de la carte du vehicule à afficher
  const cardstyle = {
    borderRadius: 4,
    boxShadow: 8,
    minWidth: 200,
    maxWidth: 260,
  };
  // style de l'image de la carte du vehicule à afficher
  const cardmediastyle = {
    height: "150px",
  };
  // style du corps de la carte du vehicule à afficher
  const cardheaderstyle = {
    paddingBottom: "0",
    textAlign: "center",
  };
  // style du corps de la carte du vehicule à afficher
  const cardcontentstyle = {
    marginTop: "0",
    padding: "0",
  };
  // style de l'affichage du modéle précis
  const cardtyposub1style = {
    fontWeight: "2000",
    marginTop: "0",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  // style de l'affichage de l'année etc...
  const cardtypobody2style = {
    paddingTop: "20px",
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    fontSize: "12px",
  };
// chargement des données du vehicule pour l'affichage
  const {
    id_vehicule,
    Marque,
    Modele,
    Modeleprecis,
    Annee,
    Kilometrage,
    Energie,
    Transmission,
    Prix,
    UrlPhoto,
  } = vehicule;// données d'affichage modifiée avec les données du véhicules passées en props
  // modifie l'url du champs pour pouvoir l'utilisé pour afficher l'image
  let imageUrlaffichage = ""; // Variable pour stocker l'URL de l'image formatée
  const formattedImageUrl = UrlPhoto.replace(/\\/g, "/"); // Remplace tous les antislashes par des slashes
  imageUrlaffichage = `${backendUrl}/${formattedImageUrl}`; // crée l'url à partir  de l'url stoké dans la BD et de l'adresse du serveur
// fonction d'ouverture de la page d'affichage des informations précises du vehicule sur click de la carte
  const onClickCarte = (e) => {
    dispatch(setVehiculeEnCours(id_vehicule)); // l'id du véhicule affichée est transmise par le biais du store, c'est plus facile à gérer que par la fonction navigate
    navigate(`/fichevehicule`);// navigue vers la page fichevehicule
  };
  return (
    <main className="maincartevehicule" onClick={onClickCarte}>
      {/* Affichage de l'image*/}
      <Card sx={cardstyle}>
        <CardMedia
          component="img"
          sx={cardmediastyle}
          image={imageUrlaffichage}
          alt="Vehicle"
        />
        {/* Affichage du titre*/}
        <CardHeader title={`${Marque} ${Modele}`} sx={cardheaderstyle} />
        {/* Affichage des autres données*/}
        <CardContent sx={cardcontentstyle}>
          {/* Affichage du modéle precis et du prix*/}
          <Typography variant="subtitle1" sx={cardtyposub1style}>
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              {Modeleprecis}
            </span>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {Prix}€
            </span>
          </Typography>
          {/* Affichage der l'année, etc...*/}
          <Typography variant="body2" sx={cardtypobody2style}>
            {`${Annee} | ${Kilometrage} Km | ${Transmission} | ${Energie}`}
          </Typography>
        </CardContent>
      </Card>
    </main>
  );
};

export default CarteVehicule;
