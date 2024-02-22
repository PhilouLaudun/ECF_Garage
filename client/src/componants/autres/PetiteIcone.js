import React from 'react'
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
    const StyledCircle = styled("div")({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#BAEE0C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        "& .MuiSvgIcon-root": {
          color: "black !important", // Couleur de l'icône au survol
        },
      },
      "@media (max-width: 420px)": {
        width: "40px",
        height: "40px",
        // Ajoutez d'autres styles selon vos besoins
      },
    });
const PetiteIcone = ({ materialIcon: MaterialIcon }) => {
  return (
    <div>
      <StyledCircle>
        <IconButton>
          <MaterialIcon style={{ color: "#FFFFFF" }} />
          {/* Stylez la couleur de l'icône selon vos besoins */}
        </IconButton>
      </StyledCircle>
    </div>
  );
};

export default PetiteIcone