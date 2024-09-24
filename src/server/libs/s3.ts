import "server-only";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * 指定したバケットのオブジェクトの署名付きURLを作成する
 */
export const createPresignedUrl = async ({
  bucket,
  key,
}: { bucket?: string; key?: string }): Promise<string | undefined> => {
  const client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY_ID ?? "",
      secretAccessKey: process.env.S3_SECRET_ACCESSKEY ?? "",
    },
  });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  try {
    return await getSignedUrl(client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error(error);
  }
};
