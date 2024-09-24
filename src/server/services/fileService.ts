import { createPresignedUrl } from "@/server/libs/s3";

/**
 * 指定したファイルの署名付きURLを作成する。
 * @param fileName 署名付きURLを作成するファイル名
 */
export const createFilePresignedUrl = async (fileName: string) => {
  const presignedUrl = await createPresignedUrl({
    bucket: process.env.S3_BUCKET,
    key: fileName,
  });

  return presignedUrl;
};
