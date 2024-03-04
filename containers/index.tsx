"use client";
import Appbar from "@global/components/Appbar";
import FileActionButton from "@global/components/FileActionButton";
import FileDeleteModal from "@global/components/FileDeleteModal";
import FileUploadDrawer from "@global/components/FileUploadDrawer";
import FilesEmpty from "@global/components/FilesEmpty";
import FilesList from "@global/components/FilesList";
import Toast from "@global/components/Toast";
import { db } from "@global/db";
import { upload } from "@global/functions/upload";
import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";

export default function IndexContainer() {
  useEffect(() => {
    (async () => {
      if (location.search.includes("share-target")) {
        const keys = await caches.keys();
        const mediaCache = await caches.open(
          keys.filter((key) => key.startsWith("media"))[0]
        );
        const image = await mediaCache.match("shared-image");
        if (image) {
          const blob = await image.blob();
          console.log(blob);
          await mediaCache.delete("shared-image");
          // Handle the shared file somehow.
        }
      }
    })();
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      <Appbar />
      <Toast />
      <Box sx={{ my: 2 }} />
      <FilesEmpty />
      <FilesList />
      <FileActionButton />
      <FileUploadDrawer />
      <FileDeleteModal />
    </Box>
  );
}