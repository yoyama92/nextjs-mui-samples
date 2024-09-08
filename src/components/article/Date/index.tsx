import { formatDate } from "@/libs/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/material";
type Props = {
  date: string;
};

export const PublishedDate = ({ date }: Props) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginY: "0.8rem",
      }}
    >
      <AccessTimeIcon fontSize="small" />
      {formatDate(date)}
    </Box>
  );
};
