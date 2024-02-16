import React from 'react'
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
const OptionVehicule = () => {

    const iconeStyle = {
      fontSize: "35px",
      margin: "10px",
      "&:hover": {
        background: "radial-gradient(#E6E6FA, #1687A7)",
        borderRadius: "50%",
      },
    };

  return (
    <div>
      <div className="titreoption">
        Options
        <EditTwoToneIcon sx={iconeStyle} />
      </div>
      <div className="donnéeoption">
        <div>Jantes alu</div>
        <div>Aide parking</div>
        <div>Carte main libre</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default OptionVehicule;