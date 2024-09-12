"use client";

import { RichTextEditor } from "@/components/RichTextEditor";
import { RichTextViewer } from "@/components/RichTextViewer";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");
  return (
    <Stack spacing={2}>
      <Typography>リッチテキストエディタ</Typography>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <RichTextEditor
          onChange={(html) => {
            setValue(html);
          }}
        />
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography>埋め込み内容</Typography>
        <Box sx={{ border: value ? 1 : 0, borderRadius: 1, padding: 1 }}>
          {value}
        </Box>
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <RichTextViewer>{value}</RichTextViewer>
      </Paper>
    </Stack>
  );
};
