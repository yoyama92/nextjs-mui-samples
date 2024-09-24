"use client";

import { trpc } from "@/trpc/client";

export const downloadFile = async (href: string) => {
  const url = await trpc.file.fetchPresignedUrl.query(href);
  if (!url) {
    new Error("Fail to fetch presigned url");
    return;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "blob" },
  });

  if (!response.ok) {
    new Error("Fail to download file from GCS");
    return;
  }

  const blob = await response.blob();
  const link = document.createElement("a");
  link.download = href;
  link.href = URL.createObjectURL(blob);
  return link.click();
};
