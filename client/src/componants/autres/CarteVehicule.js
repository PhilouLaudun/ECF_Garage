import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CarteVehicule = ({ vehicule }) => {
  const {
    marque,
    modéle,
    modeleprecis,
    année,
    kilometrage,
    energie,
    transmission,
    photo,
  } = vehicule;

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 8,
        minWidth: 200,
        maxWidth: 250,
      }}
    >
      <CardMedia
        component="img"
        style={{
          height: "150px",
        }}
        image={photo}
        alt="Vehicle"
      />
      <CardHeader title={`${marque} ${modéle}`} sx={{ paddingBottom: "0", textAlign: "center" }} />
      <CardContent sx={{ marginTop: "0", padding: "0" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "2000", marginTop: "0", paddingLeft:"10px" }}
        >
          {modeleprecis}
        </Typography>
        <Typography
          variant="body2"
          sx={{ paddingTop: "20px", borderBottom: "1px solid #ccc", textAlign: "center" }}
        >
          {`${année} | ${kilometrage} Km | ${transmission} | ${energie}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarteVehicule;
