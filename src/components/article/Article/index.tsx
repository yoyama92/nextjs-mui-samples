import { RichTextViewer } from "@/components/RichTextViewer";
import type { Article as ArticleType } from "@/types/microcms";
import { Box, Paper, Typography } from "@mui/material";
import { PublishedDate } from "../Date";
import { TagList } from "../TagList";

export const Article = ({
  data,
}: {
  data: ArticleType;
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        {data.title}
      </Typography>
      <TagList tags={data.tags} />
      <Box
        component="p"
        sx={{
          marginY: "24px",
          marginX: "40px",
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        {data.description}
      </Box>
      <Box
        component="p"
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "64px",
        }}
      >
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </Box>
      <Box component="picture">
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <Box
          component="img"
          src={data.thumbnail?.url}
          alt=""
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
          sx={{
            width: "960px",
            maxWidth: "100%",
            height: "auto",
            marginBottom: "64px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "720px",
          maxWidth: "100%",
        }}
      >
        <RichTextViewer>{data.content}</RichTextViewer>
      </Box>
    </Paper>
  );
};
