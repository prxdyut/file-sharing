import { s3 } from "@global/utils/s3";
import { AWSError, S3 } from "aws-sdk";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteFileFromS3 = async (
  params: S3.DeleteObjectRequest,
  successCallback: Function,
  failureCallback: Function
) => {
  try {
    s3.deleteObject(params, function (err, data) {
      if (err) {failureCallback(err.message);}
      else successCallback();
    });
  } catch (error) {
    console.log("Upload Error ", error);
    failureCallback(error)
  }
};
