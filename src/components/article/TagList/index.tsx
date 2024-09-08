import type { Tag } from "@/types/microcms";
import { Stack } from "@mui/material";
import { TagListItem } from "./tagListItem";

type Props = {
  tags?: Tag[];
  hasLink?: boolean;
};

export const TagList = ({ tags, hasLink = true }: Props) => {
  if (!tags) {
    return null;
  }
  return (
    <Stack spacing={1} direction="row">
      {tags.map((tag) => (
        <TagListItem tag={tag} hasLink={hasLink} key={tag.id} />
      ))}
    </Stack>
  );
};
