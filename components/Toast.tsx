import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppContext from "@global/context";
import { Slide, SlideProps } from "@mui/material";

export default function Toast() {
  const appContext = React.useContext(AppContext);
  const toast = appContext.get().toast;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    appContext.set({ toast: false });
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        key={toast}
        open={toast}
        autoHideDuration={10000}
        onClose={handleClose}
        message={toast}
        action={action}
        sx={{
          "& .MuiSnackbarContent-message": { wordBreak: "break-all" },
        }}
      />
    </div>
  );
}
