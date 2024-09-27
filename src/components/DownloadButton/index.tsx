"use client";

import { downloadFile } from "@/libs/file";
import { Box, CircularProgress, Link } from "@mui/material";
import { type ReactNode, useState } from "react";

/**
 * ファイルをダウンロードするボタン
 */
export const DownloadButton = ({
  href,
  children,
}: {
  /** 取得するファイルのURL */
  href: string;
  /** ボタンに表示する子要素 */
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        position: "relative",
      }}
    >
      <Link
        component="button"
        underline="hover"
        color={loading ? "textDisabled" : "primary"}
        onClick={() => {
          setLoading(true);
          downloadFile(href)
            .catch(() => {
              window.alert("ダウンロードに失敗しました。");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        disabled={loading}
      >
        {children}
      </Link>
      {loading && (
        <CircularProgress
          size={24}
          sx={{ position: "absolute", left: "50%" }}
        />
      )}
    </Box>
  );
};
