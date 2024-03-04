import * as React from "react";
import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import {
  CopyAll,
  Delete,
  Download,
  MoreVert,
  PushPin,
  PushPinOutlined,
  Share,
  StarBorder,
} from "@mui/icons-material";
import AppContext from "@global/context";
import {
  downloadFile,
  getFileExtension,
  getFileTypeByExtension,
} from "@global/functions/file";
import { useLocalStorage } from "@mantine/hooks";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    // color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

export default function FileMenu({
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
  const appContext = React.useContext(AppContext);
  const [, setPin] = useLocalStorage({
    key: "pinned",
  });
  const pinned = appContext.get("local");
  const isPinned = pinned.includes(file.id as never);
  console.log(pinned);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    appContext.set({ deleteFile: file });
    handleClose();
  };

  const handleDownload = () => {
    downloadFile(file.url, `${file.name}.${getFileExtension(file.url)}`);
    handleClose();
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(file.url).then(
      function () {
        appContext.set({ toast: 'Link copied' });
      },
      function (err) {
        appContext.set({ toast: "Couldn't copy link" });
      }
    );
    handleClose();
  };

  const handleShare = async () => {
    const shareData = {
      title: file.name as string,
      text: getFileTypeByExtension(file.url),
      url: file.url,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      appContext.set({ toast: "There was an error sharing file!" });
    }
    handleClose();
  };

  const handleTogglePin = async () => {
    const removedFromPinned = pinned.filter((val: number) => val != file.id);
    const addedToPinned = [...pinned, file.id];

    if (isPinned) setPin(removedFromPinned);
    // @ts-ignore
    else setPin(addedToPinned);

    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <StyledMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleShare}>
          <Share />
          Share
        </MenuItem>
        <MenuItem onClick={handleCopy}>
          <CopyAll />
          Copy Link
        </MenuItem>
        <MenuItem onClick={handleTogglePin}>
          {isPinned ? <PushPinOutlined /> : <PushPin />}
          {isPinned ? "Un Pin" : "Pin"}
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <Download />
          Download
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "error.dark",
            "&:active": {
              bgcolor: "error",
            },
          }}
        >
          <Delete color="error" />
          Delete
        </MenuItem>
      </StyledMenu>
    </>
  );
}
