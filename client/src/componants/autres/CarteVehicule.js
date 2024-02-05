import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const CarteVehicule = ({ vehicule }) => {
  const navigate = useNavigate();
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
    marque,
    modéle,
    modeleprecis,
    année,
    kilometrage,
    energie,
    transmission,
    photo,
    prix,
  } = vehicule;
  const onClickCarte = (e) => { 
    console.log("onClickCarte")
    console.log("id", vehicule.id);
    navigate(`/fichevehicule/${vehicule.id}`);
  }
  return (
    <main className="maincartevehicule" onClick={onClickCarte}>
      <Card sx={cardstyle}>
      <CardMedia
        component="img"
        sx={cardmediastyle}
        image={photo}
        alt="Vehicle"
      />
      <CardHeader title={`${marque} ${modéle}`} sx={cardheaderstyle} />
      <CardContent sx={cardcontentstyle}>
        <Typography variant="subtitle1" sx={cardtyposub1style}>
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
            {modeleprecis}
          </span>
          <span style={{ fontSize: "15px", fontWeight: "bold" }}>{prix}€</span>
        </Typography>
        <Typography variant="body2" sx={cardtypobody2style}>
          {`${année} | ${kilometrage} Km | ${transmission} | ${energie}`}
        </Typography>
      </CardContent>
    </Card> </main>
    
  );
};

export default CarteVehicule;
