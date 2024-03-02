"use client";
import { upload } from "@global/functions/upload";
import React from "react";

export default function IndexContainer() {
  const uploadFile = upload.bind(null, {
    params: {
      Bucket: "simplefilesharing69",
      Key: "upmostly-nextjs-s3-file-upload.txt",
      Body: "hello world",
    },
  });
  
  return (
    <div>
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
