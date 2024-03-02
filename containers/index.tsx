"use client";
import React from "react";
import { S3 } from "aws-sdk";

export default function IndexContainer() {
  const s3 = new S3({
    accessKeyId: "AKIA6ODU2MOGVPCEMUW7",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
  const params = {
    Bucket: "simplefilesharing69",
    Key: "upmostly-nextjs-s3-file-upload.txt",
    Body: "hello world",
  };
  const upload = async () => {
    try {
      const uploaded = s3.upload(
        params,
        (err: Error, data: S3.ManagedUpload.SendData) =>
          console.log("Upload data ", {data,err})
      );
      uploaded.on("httpUploadProgress", (data) => {
        console.log("Upload Progress ", data);
      });
      await uploaded.promise();
      console.log("Uploaded File ", uploaded);
    } catch (error) {
      console.log("Upload Error ", error);
    }
  };

  return (
    <div>
      <button onClick={upload}>Upload</button>
    </div>
  );
}
