"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Box, Skeleton } from "@mui/material";

export const AuthGuardImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const [presignedUrl, setPresignedUrl] = useState<string | undefined>();
  useEffect(() => {
    trpc.file.fetchPresignedUrl
      .query(src)
      .then((url) => {
        if (url) {
          return fetch(url, {
            method: "GET",
            headers: { "Content-Type": "blob" },
          });
        }
        return Promise.reject(new Error("Fail to fetch presigned url"));
      })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error("Fail to download file from GCS"));
        }
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = () => {
          if (reader.result) {
            setPresignedUrl(reader.result.toString());
          }
        };
      });
  }, [src]);

  if (presignedUrl) {
    return (
      <Box
        component="img"
        src={presignedUrl}
        alt="account"
        width={width}
        height={height}
        loading="lazy"
      />
    );
  }
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      animation="wave"
    />
  );
};
