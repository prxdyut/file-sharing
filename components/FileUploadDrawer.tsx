
// @ts-nocheck
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AppContext from "@global/context";
import {
  Container,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { upload } from "@global/functions/upload";
import {
  removeFileExtension,
  getFileExtension,
  getFileTypeByExtension,
  getFileSize,
} from "@global/functions/file";
import { db } from "@global/db";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function FileUploadDrawer() {
  const appContext = React.useContext(AppContext);
  const file = appContext.get().newFile?.file as File;
  const fileName = file?.name || "";

  const handleClose = () => appContext.set({ newFile: false });
  const handleOpen = () => null;

  const handleSubmit = async (formData: FormData) => {
    const name = (formData.get("name") ||
      removeFileExtension(fileName)) as string;

    const res = await upload(
      {
        Bucket: "simplefilesharing69",
        Key: `vidhi/${name}.${getFileExtension(fileName)}`,
        Body: file,
      },
      (data: Object) => {
        handleClose();
        if (data) appContext.set({ uploadProgress: { ...data, fileName } });
        else appContext.set({ uploadProgress: false, toast: `Uploaded ${name}`  });
      }
    );
    if (res.url)
      await db.files.add({
    
        name,
        size: file.size,
        date: new Date(),
        url: res.url as string,
        type: getFileTypeByExtension(fileName),
      });
    else alert(res.error);
  };

  return (
    <div>
      <SwipeableDrawer
        disableDiscovery
        open={appContext.get().newFile}
        anchor="bottom"
        disableSwipeToOpen={false}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <Container>
          <Box sx={{ height: 20 }}>
            <Puller />
          </Box>
       
          <form action={handleSubmit}>
            <Stack gap={2} sx={{ pb: 2 }}>
              <Typography variant="h6">Upload File</Typography>
              <Typography variant="body2">
                Type :{" "}
                <b style={{ fontWeight: 600 }}>
                  {getFileTypeByExtension(fileName)}
                </b>
              </Typography>
              <Typography variant="body2">
                Size :{" "}
                <b style={{ fontWeight: 600 }}>
                  {getFileSize(file?.size || 0)}
                </b>
              </Typography>
              <TextField
              key={fileName}
                id="filled-basic"
                label="Name"
                variant="filled"
                name="name"
                placeholder={removeFileExtension(fileName)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box />
              <Button type="submit" sx={{ p: 2 }} variant="contained">
                Upload
              </Button>
            </Stack>
          </form>
        </Container>
      </SwipeableDrawer>
    </div>
  );
}
