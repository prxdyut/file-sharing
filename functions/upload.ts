import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "AKIA6ODU2MOGVPCEMUW7",
  secretAccessKey: "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",
  region: "ap-south-1",
});

export const upload = async ({ params }: { params: S3.PutObjectRequest }) => {
  try {
    const uploaded = s3.upload(
      params,
      (err: Error, data: S3.ManagedUpload.SendData) =>
        console.log("Upload data ", { data, err })
    );
    uploaded.on("httpUploadProgress", (data) => {
      console.log("Upload Progress ", data);
    });
    await uploaded.promise();
    console.log(`${location.origin}/uploads/${params.Key}`)
  } catch (error) {
    console.log("Upload Error ", error);
  }
};
