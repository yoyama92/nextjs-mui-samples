"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const inputSchema = z.object({
  file: z
    .object({
      values: z
        .array(
          z.string().refine(
            (arg) => {
              return arg.length === 5;
            },
            {
              message: "5文字ではありません。",
            },
          ),
        )
        .min(1),
    })
    .optional(),
});

type Inputs = z.infer<typeof inputSchema>;

export default () => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.alert(`送信しました。\n${JSON.stringify(data, null, 2)}`);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setLoading(true);
      setValue("file", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (!acceptedFiles || acceptedFiles?.length === 0) {
        setValue("file", undefined, {
          shouldValidate: true,
          shouldDirty: true,
        });
        return;
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();
      // ファイル読み込み完了時に発火するリスナー
      reader.addEventListener("load", () => {
        try {
          const result = reader.result;
          if (typeof result === "string") {
            const list = result.trim().split(/\r\n|\n|\r/);
            setValue(
              "file",
              { values: list },
              {
                shouldValidate: true,
                shouldDirty: true,
              },
            );
          } else {
            setValue("file", undefined, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        } finally {
          setLoading(false);
        }
      });
      reader.readAsText(file);
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    disabled: loading,
  });
  return (
    <Box>
      <Box component="h2">ファイルアップロード機能</Box>
      <Stack gap={2} useFlexGap={true}>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          gap={1}
          useFlexGap={true}
        >
          <FormControl error={errors.file?.values !== undefined}>
            <Paper
              {...getRootProps()}
              sx={{
                width: "420px",
                height: "120px",
                borderStyle: "dashed",
                borderRadius: "8px",
                borderColor: isDragActive ? "grey.700" : "grey.500",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                color: isDragActive ? "grey.700" : "grey.500",
                backgroundColor: loading ? "grey.300" : "white",
              }}
              elevation={0}
            >
              ファイルを選択またはドラッグアンドドロップ
              <input {...getInputProps()} />
              {loading && (
                <CircularProgress
                  size={48}
                  color="primary"
                  sx={{
                    position: "absolute",
                  }}
                />
              )}
            </Paper>
            {errors.file?.values !== undefined && (
              <FormHelperText
                sx={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {Array.isArray(errors.file?.values)
                  ? errors.file.values
                      .map((value, index) => {
                        if (value !== undefined) {
                          return `${index + 1}行目:${value?.message}`;
                        }
                      })
                      .filter((v) => v !== undefined)
                      .join("\n")
                  : errors.file?.values?.message}
              </FormHelperText>
            )}
          </FormControl>

          <Stack gap={1} useFlexGap={true} direction="row">
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                width: "fit-content",
              }}
            >
              送信
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => {
                setValue("file", undefined, {
                  shouldValidate: true,
                });
              }}
            >
              取り消し
            </Button>
          </Stack>
        </Stack>
        <Box>
          <Box component="h3">入力値</Box>
          <Box
            component="ul"
            sx={{
              paddingInlineStart: 3,
            }}
          >
            {useWatch({
              control: control,
              name: "file.values",
            })?.map((v) => {
              return (
                <Typography component="li" key={v}>
                  {v}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
