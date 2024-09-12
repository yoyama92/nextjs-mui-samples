import { ArticleList } from "@/components/article/ArticleList";
import { Pagination } from "@/components/article/Pagination";
import { LIMIT } from "@/constants";
import { getCaller } from "@/libs/trpc";
import { Box, Paper } from "@mui/material";

type Props = {
  params: {
    current: string;
  };
};

export const revalidate = 60;

export default async ({ params }: Props) => {
  const current = Number.parseInt(params.current as string, 10);

  const caller = await getCaller();
  const data = await caller.microcms.getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
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
        <Pagination
          totalCount={data.totalCount}
          current={current}
          basePath="/articles"
        />
      </Box>
    </Paper>
  );
};
