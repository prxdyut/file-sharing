import { s3 } from "@global/utils/s3";
import { S3 } from "aws-sdk";

export const upload = async (
  params: S3.PutObjectRequest,
  uploadProgressCallback: Function
) => {
  try {
    const uploaded = s3.upload(
      params,
      (err: Error, data: S3.ManagedUpload.SendData) =>
        console.log("Upload data ", { data, err })
    );
    uploaded.on("httpUploadProgress", (data) => {
      uploadProgressCallback(data);
    });
    await uploaded.promise();
    uploadProgressCallback(false);
    return { url: `${location.origin}/uploads/${params.Key}` };
  } catch (error) {
    console.log("Upload Error ", error);
    return { error };
  }
};
