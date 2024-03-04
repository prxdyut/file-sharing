import { db } from "@global/db";
import { Box, Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
export default function FilesEmpty() {
  const files = useLiveQuery(() => db.files.toArray());
  if (files) {
    if (files.length > 0) return <></>;
  }
  return (
    <>
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
        <img
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
          {`Looks like you have not`}
          <br />
          {` uploaded anything yet`}
        </Typography>
      </Box>
    </>
  );
}
