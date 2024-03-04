import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemButton from "@mui/material/ListItemButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AppContext from "@global/context";
import { HighlightOff, Remove } from "@mui/icons-material";
import { getFileSize, removeFileExtension } from "@global/functions/file";
import FilesDivider from "./FilesDivider";
const files = [
  { name: "Dinesh Sir Chemistry Notes For Boards and Nothing Else" },
];

export default function FileUploadingItem() {
  const appContext = React.useContext(AppContext);
  const uploading = appContext.get().uploadProgress;
  const uploadingProgress = uploading
    ? (uploading?.loaded / uploading?.total) * 100
    : 0;

  return (
    <>
      {uploading && uploading?.loaded && (
        <>
          <FilesDivider>Uploading</FilesDivider>
          <Box
            sx={{
              mt: 1,
              height: 71.4,
              width: `${uploadingProgress}%`,
              position: "absolute",
              bgcolor: "primary.light",
            }}
          />
          <ListItem
            dense
            secondaryAction={
              <IconButton>
                {/* <HighlightOff /> */}
              </IconButton>
            }
            sx={{mt:1}}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    display: "inline-block",
                    width: "95%",
                    whiteSpace: "nowrap",
                    overflow: "hidden !important",
                    textOverflow: "ellipsis",
                  }}
                >
                  {removeFileExtension(uploading?.fileName)}
                </Typography>
              }
              secondary={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography component={"span"} fontSize={14} fontWeight={500}>
                    JPG
                  </Typography>

                  <CircleIcon sx={{ fontSize: 4, my: 1 }} />
                  <Typography component={"span"} fontSize={14} fontWeight={600}>
                    {getFileSize(uploading?.loaded)} /{" "}
                    {getFileSize(uploading?.total)}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
          <Box sx={{ width: "100%", mb: 4 }} />
        </>
      )}
    </>
  );
}
