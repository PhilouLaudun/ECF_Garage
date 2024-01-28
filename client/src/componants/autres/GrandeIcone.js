import React from 'react'
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
    const StyledCircle = styled("div")({
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      border: "2px solid #6C5DBB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: "#BAEE0C",
        border: "2px solid #FFFFFF",
        "& .MuiSvgIcon-root": {
          color: "#FFFFFF !important", // Couleur de l'icône au survol
        },
      },
    });
const GrandeIcone = ({ materialIcon: MaterialIcon }) => {
  return (
    <div>
      <StyledCircle>
        <IconButton>
          <MaterialIcon style={{ color: "#6C5DBB", fontSize:"50px" }} />
          {/* Stylez la couleur de l'icône selon vos besoins */}
        </IconButton>
      </StyledCircle>
    </div>
  );
};

export default GrandeIcone;