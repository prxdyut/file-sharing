"use client";
import Appbar from "@global/components/Appbar";
import FileActionButton from "@global/components/FileActionButton";
import FileDeleteModal from "@global/components/FileDeleteModal";
import FileUploadDrawer from "@global/components/FileUploadDrawer";
import FilesEmpty from "@global/components/FilesEmpty";
import FilesList from "@global/components/FilesList";
import InstallPWA from "@global/components/InstallPWA";
import Toast from "@global/components/Toast";
import { db } from "@global/db";
import { upload } from "@global/functions/upload";
import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";

export default function IndexContainer() {

  return (
    <Box sx={{ my: 2 }}>
      <Appbar />
      <Toast />
      <InstallPWA />
      <Box sx={{ my: 2 }} />
      <FilesEmpty />
      <FilesList />
      <FileActionButton />
      <FileUploadDrawer />
      <FileDeleteModal />
    </Box>
  );
}