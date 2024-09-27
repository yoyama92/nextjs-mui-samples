import type { Tag } from "@/types/microcms";
import { Chip } from "@mui/material";
import NextLink from "next/link";

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export const TagListItem = ({ tag, hasLink = true }: Props) => {
  if (hasLink) {
    return (
      <Chip
        label={`#${tag.name}`}
        component={NextLink}
        href={`/tags/${tag.id}`}
        clickable={true}
        size="small"
        sx={{
          borderRadius: 1,
        }}
      />
    );
  }
  return (
    <Chip
      component="span"
      label={`#${tag.name}`}
      size="small"
      sx={{
        borderRadius: 1,
      }}
    />
  );
};
