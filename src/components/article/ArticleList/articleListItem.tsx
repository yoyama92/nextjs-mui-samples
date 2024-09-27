import type { Article } from "@/types/microcms";
import { Box, Link } from "@mui/material";
import Image from "next/image";
import { PublishedDate } from "../Date";
import { TagList } from "../TagList";

export const ArticleListItem = ({
  article,
}: {
  article: Article;
}) => {
  return (
    <Box
      component="li"
      sx={{
        marginBottom: 1,
        paddingY: 1,
        ":hover": {
          backgroundColor: "grey.100",
        },
      }}
    >
      <Link
        href={`/articles/${article.id}`}
        color="inherit"
        underline="none"
        sx={{
          display: "flex",
          gap: "40px",
          alignItems: "",
        }}
      >
        {article.thumbnail ? (
          <Box component="picture">
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={`${article.thumbnail?.url}?fm=webp&w=414 1x, ${article.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
            />
            <source
              type="image/webp"
              srcSet={`${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
            />
            <Box
              component="img"
              src={article.thumbnail?.url || "/noimage.png"}
              alt=""
              width={article.thumbnail?.width}
              height={article.thumbnail?.height}
              sx={{
                width: "240px",
                height: "auto",
              }}
            />
          </Box>
        ) : (
          <Image src="/no-image.png" alt="No Image" width={1200} height={630} />
        )}
        <Box component="dl">
          <Box
            component="dt"
            typography="h5"
            fontWeight="bold"
            sx={{
              marginBottom: "0.5rem",
            }}
          >
            {article.title}
          </Box>
          <Box component="dd">
            <TagList tags={article.tags} hasLink={false} />
          </Box>
          <Box component="dd">
            <PublishedDate date={article.publishedAt || article.createdAt} />
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
