import React from "react";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" color="inherit">
        <strong>404 PAGE </strong>
      </Typography>
      <Typography variant="h6" color="inherit">
        Page not found
      </Typography>
    </div>
  );
};

export default NotFound;
