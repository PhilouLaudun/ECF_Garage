import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";

const AuthorizedActionsComponent = ({
  onClose,
  onEdit,
  onCreate,
  onSave,
  isAuthorized,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  const handleCreate = () => {
    setIsEditing(true);
    onCreate();
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave();
  };
console.log("barre icon")
  return (
    isAuthorized && (
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        {/* Bouton de fermeture conditionnel */}
        {onClose && (
          <IconButton onClick={onClose}>
            <CancelTwoToneIcon />
          </IconButton>
        )}
        {!isEditing && (
          <>
            <IconButton onClick={handleEdit}>
              <EditTwoToneIcon />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <AddCircleTwoToneIcon />
            </IconButton>
          </>
        )}
        {isEditing && (
          <IconButton onClick={handleSave}>
            <SaveTwoToneIcon />
          </IconButton>
        )}
      </div>
    )
  );
};

export default AuthorizedActionsComponent;
