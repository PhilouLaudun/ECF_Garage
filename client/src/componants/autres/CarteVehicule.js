import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { setVehiculeEnCours } from "../../features/slice/vehiculeSlice";
import { useDispatch } from "react-redux";
const backendUrl = process.env.REACT_APP_BACKEND_URL; // charge l'url du serveur pour charger directement les photos à partir du serveur, fichier .env à la racine de /client

const CarteVehicule = ({ vehicule }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const cardstyle = {
    borderRadius: 4,
    boxShadow: 8,
    minWidth: 200,
    maxWidth: 260,
  };
  const cardmediastyle = {
    height: "150px",
  };
  const cardheaderstyle = {
    paddingBottom: "0",
    textAlign: "center",
  };
  const cardcontentstyle = {
    marginTop: "0",
    padding: "0",
  };
  const cardtyposub1style = {
    fontWeight: "2000",
    marginTop: "0",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const cardtypobody2style = {
    paddingTop: "20px",
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    fontSize: "12px",
  };
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
  } = vehicule;
  // modifie l'url du champs pour pouvoir l'utilisé pour afficher l'image
  let imageUrlaffichage = ""; // Variable pour stocker l'URL de l'image formatée
  const formattedImageUrl = UrlPhoto.replace(/\\/g, "/"); // Remplace tous les antislashes par des slashes
  imageUrlaffichage = `${backendUrl}/${formattedImageUrl}`; // crée l'url à partir  de l'url stoké dans la BD et de l'adresse du serveur

  const onClickCarte = (e) => {
    dispatch(setVehiculeEnCours(id_vehicule));
    navigate(`/fichevehicule`);
  };
  return (
    <main className="maincartevehicule" onClick={onClickCarte}>
      <Card sx={cardstyle}>
        <CardMedia
          component="img"
          sx={cardmediastyle}
          image={imageUrlaffichage}
          alt="Vehicle"
        />
        <CardHeader title={`${Marque} ${Modele}`} sx={cardheaderstyle} />
        <CardContent sx={cardcontentstyle}>
          <Typography variant="subtitle1" sx={cardtyposub1style}>
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              {Modeleprecis}
            </span>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {Prix}€
            </span>
          </Typography>
          <Typography variant="body2" sx={cardtypobody2style}>
            {`${Annee} | ${Kilometrage} Km | ${Transmission} | ${Energie}`}
          </Typography>
        </CardContent>
      </Card>{" "}
    </main>
  );
};

export default CarteVehicule;
