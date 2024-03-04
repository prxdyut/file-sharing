import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import ImageIcon from "@mui/icons-material/Image";
import { Drawer, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Close, PictureAsPdf } from "@mui/icons-material";
import { upload } from "@global/functions/upload";
import AppContext from "@global/context";
import { handleFileSelect } from "@global/functions/file";

const actions = [
  { Icon: ImageIcon, name: "Photo", type: "image/*" },
  { Icon: PictureAsPdf, name: "PDF", type: "application/pdf" },
];

export default function FileActionButton() {
  const context = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Backdrop open={open} onClick={handleClose} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 56, right: 32 }}
        icon={<SpeedDialIcon icon={<UploadIcon />} openIcon={<Close />} />}
        FabProps={{ onClick: open ? handleClose : handleOpen }}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<action.Icon sx={{ color: "primary.dark" }} />}
            tooltipTitle={
              <Typography fontWeight={600}>{action.name}</Typography>
            }
            tooltipOpen
            onClick={handleFileSelect.bind(
              null,
              action.type,
              () => handleClose(),
              (file : File) => context.set({ newFile: { file: file } })
            )}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
