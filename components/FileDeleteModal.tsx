import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Close } from "@mui/icons-material";
import AppContext from "@global/context";
import { Fade, IconButton } from "@mui/material";
import { deleteFileFromS3 } from "@global/functions/delete";
import { AWSError } from "aws-sdk";
import { db } from "@global/db";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100vw - 32px)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export default function BasicModal() {
  const [fileName, setFileName] = React.useState("");
  const appContext = React.useContext(AppContext);
  const deleteFile = appContext.get().deleteFile;
  const ModalState = Boolean(deleteFile);
  console.log(appContext.get());
  const handleClose = () => appContext.set({ deleteFile: false });
  const handleDelete = async () => {
    await deleteFileFromS3(
      {
        Bucket: "simplefilesharing69",
        Key: deleteFile.url.replace("http://localhost:3000/uploads/", ""),
      },
      async () => {
        await db.files.delete(deleteFile.id);
        appContext.set({
          toast: `Deleted ${deleteFile.name}`,
          deleteFile: false,
        });
      },
      (errorMessage: string) => appContext.set({ toast: errorMessage })
    );
  };

  React.useEffect(() => {
    deleteFile && setFileName(deleteFile?.name);
  }, [deleteFile]);

  return (
    <div>
      <Modal
        open={ModalState}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={ModalState}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Delete File
              </Typography>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Typography id="modal-modal-description" sx={{ mb: 2 }}>
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: '600',
overflowWrap: 'break-word',
wordBreak: 'break-word' }}>{fileName}</span>?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="text">Cancel</Button>
              <Button color="error" variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
