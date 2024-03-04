import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemButton from "@mui/material/ListItemButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileUploadingItem from "./FileUploadingItem";
import {
  downloadFile,
  getFileExtension,
  getFileSize,
} from "@global/functions/file";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@global/db";
import { formatDate } from "@global/functions/date";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AppContext from "@global/context";
import ShareIcon from "@mui/icons-material/Share";
import FileMenu from "./FileMenu";
import FilesDivider from "./FilesDivider";
import Image from "next/image";
import { PictureAsPdf, PictureAsPdfOutlined, PlayCircleFilled, PlayCircleOutline } from "@mui/icons-material";

function FilesListItem({
  file,
}: {
  file: {
    id?: number;
    name: String;
    size: number;
    date: Date;
    url: string;
    type: String;
  };
}) {
  const Icon: React.FC = () => {
    switch (file.type) {
      case "Image":
        return <img src={file.url} />;
        break;

      case "PDF":
        return <PictureAsPdfOutlined />;
        break;
      case "Video":
        return <PlayCircleOutline />;
        break;
      default:
        return <AttachFileIcon sx={{ transform: "rotate(45deg)" }} />;
        break;
    }
  };

  return (
    <>
      <ListItem disablePadding secondaryAction={<FileMenu file={file} />}>
        <ListItemButton
          sx={{ pr: 1 }}
          onClick={() =>
            downloadFile(file.url, `${file.name}.${getFileExtension(file.url)}`)
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <Icon />
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
                {file.name}
              </Typography>
            }
            secondary={
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography fontSize={14} component={"span"}>
                  {formatDate(file.date)}
                </Typography>
                <CircleIcon sx={{ fontSize: 4, my: 1 }} />
                <Typography component={"span"} fontSize={14} fontWeight={500}>
                  {file.type}
                </Typography>
                <CircleIcon sx={{ fontSize: 4, my: 1 }} />
                <Typography component={"span"} fontSize={14} fontWeight={600}>
                  {getFileSize(file.size)}
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default function FilesList() {
  const files = useLiveQuery(() => db.files.reverse().sortBy("id"));
  const appContext = React.useContext(AppContext);
  const pinned = files?.filter((val) =>
    appContext.get("local").includes(val.id)
  );
  const notPinned = files?.filter(
    (val) => !appContext.get("local").includes(val.id)
  );
  const searchText = appContext.get().searchText;
  const filtered = files?.filter((val) => val.name.includes(searchText));
  console.log(appContext);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <FileUploadingItem />
      {searchText ? (
        <>
          {filtered?.length != 0 ? (
            <FilesDivider>Search</FilesDivider>
          ) : (
            <Box
              sx={{
                height: "75vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                flexDirection: "column",
              }}
            >
              <Image
                src={"/uploads/thinking.jpg"}
                height={1000}
                width={1000}
                alt="Thinking"
              />
              <Typography
                variant="h6"
                sx={{
                  width: "75vw",
                  textAlign: "center",
                  fontWeight: 700,
                  position: "relative",
                }}
              >
                {`Can't Find : ${searchText}`}
              </Typography>
            </Box>
          )}
          {filtered?.map((file, index) => (
            <FilesListItem file={file} key={index} />
          ))}
        </>
      ) : (
        <>
          {files && pinned?.length != 0 && <FilesDivider>Pinned</FilesDivider>}
          {files &&
            pinned?.map((file, index) => (
              <FilesListItem file={file} key={index} />
            ))}
          {files && pinned?.length != 0 && (
            <Box sx={{ width: "100%", mb: 4 }} />
          )}

          {files && files?.length != 0 && (
            <FilesDivider>All Files</FilesDivider>
          )}
          {files?.map((file, index) => (
            <FilesListItem file={file} key={index} />
          ))}
        </>
      )}
    </List>
  );
}
