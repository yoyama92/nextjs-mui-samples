import type { Article } from "@/types/microcms";
import { Box, Typography } from "@mui/material";
import { ArticleListItem } from "./articleListItem";

export const ArticleList = ({
  articles,
}: {
  articles?: Article[];
}) => {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return (
      <Typography component="p" color="textDisabled">
        記事がありません。
      </Typography>
    );
  }
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        p: 2,
      }}
    >
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </Box>
  );
};
