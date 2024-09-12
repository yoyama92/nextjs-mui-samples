import { LIMIT } from "@/constants";
import { Pagination } from "@/components/article/Pagination";
import { ArticleList } from "@/components/article/ArticleList";
import { Box, Paper } from "@mui/material";
import { getCaller } from "@/libs/trpc";

export const revalidate = 60;

export default async () => {
  const caller = await getCaller();
  const data = await caller.microcms.getList({
    limit: LIMIT,
  });

  return (
    <Paper>
      <ArticleList articles={data.contents} />
      <Box
        sx={{
          padding: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination totalCount={data.totalCount} basePath="/articles" />
      </Box>
    </Paper>
  );
};
