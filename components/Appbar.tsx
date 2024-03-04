import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Avatar,
  Box,
  ButtonBase,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from "@mui/material";
import { Cancel, Close, MoreVert, Upload } from "@mui/icons-material";
import { formatDate } from "@global/functions/date";
import { handleFileSelect } from "@global/functions/file";
import AppContext from "@global/context";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@global/db";

export default function Appbar() {
  const context = React.useContext(AppContext);
  const [search, setSearch] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSearch = () => setSearch(true);
  const handleCloseSearch = () => setSearch(false);
  const uploading = context.get().uploadProgress;
  const uploadingProgress = uploading
    ? (uploading?.loaded / uploading?.total) * 100
    : 0;
  const files = useLiveQuery(() => db.files.toArray());
  console.log(context.get()?.searchText);
  return (
    <Box
      sx={{
        position: "sticky",
        top: "16px",
        zIndex: 999,
        px: 2,
      }}
    >
      <Paper
        // component={ButtonBase}
        elevation={0}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          bgcolor: "primary.light",
          borderRadius: 12,
          position: "sticky",
          top: "16px",
          zIndex: 999,
          width: "100%",
        }}
      >
        <>
          <IconButton sx={{ p: "10px" }} aria-label="menu" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
          <InputBase
            autoFocus
            autoSave="search"
            onChange={(e) => context.set({ searchText: e.target.value })}
            value={context.get().searchText}
            sx={{
              flex: 1,
              "& ::placeholder": {
                color: "black",
                fontWeight: 500,
              },
            }}
            placeholder={"Search Images and Files"}
          />
          {context.get().searchText && (
            <IconButton
              type="button"
              sx={{
                p: "10px",
                bgcolor: "primary.light",
                mr:1
              }}
              aria-label="search"
              onClick={() => context.set({ searchText: "" })}
            >
              <Cancel />
            </IconButton>
          )}
          <Tooltip title="Vidhi Tripathi">
    
            <Avatar
              aria-label="recipe "
              src="https://simplefilesharing69.s3.ap-south-1.amazonaws.com/index.png"
            >
              V
            </Avatar>
          </Tooltip>
        </>

        <SwipeableDrawer
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          sx={{ height: "100vh", py: 2 }}
        >
          <CardHeader
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              minWidth: "60vw",
            }}
            avatar={
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe "
                src="https://simplefilesharing69.s3.ap-south-1.amazonaws.com/index.png"
              >
                V
              </Avatar>
            }
            title={
              <Typography variant="h6" fontWeight={700}>
              {`Vidhi's Archive`}
              </Typography>
            }
            subheader={
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="body2"
                  // @ts-ignore
                  sx={{ display: !uploading && "none", mb: 1 }}
                  fontWeight={500}
                >
                  Uploading File : {Math.floor(uploadingProgress)}%
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {files?.length} Total Files
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {
                    files?.filter((file) =>
                      context?.get("local").includes(file.id)
                    ).length
                  }{" "}
                  Pinned
                </Typography>
              </Box>
            }
          />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  onClick={handleFileSelect.bind(
                    null,
                    "*",
                    () => handleClose(),
                    (file: File) => context.set({ newFile: { file: file } })
                  )}
                >
                  <Upload />
                </ListItemIcon>
                <ListItemText primary={"Upload Any File"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <ListItem sx={{ pb: 4 }}>
            <Typography variant="caption">Made with ❤️ by Pradyut</Typography>
          </ListItem>
        </SwipeableDrawer>
      </Paper>
    </Box>
  );
}
