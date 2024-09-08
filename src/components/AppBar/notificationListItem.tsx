import { trpc } from "@/trpc/client";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

export const NotificationListItem = ({
  targetId,
  title,
  content,
  read,
}: {
  targetId: number;
  title: string;
  content: string;
  read: boolean;
}) => {
  const [value, setRead] = useState(read);
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        ":hover": {
          backgroundColor: "grey.100",
        },
        alignItems: "center",
      }}
    >
      <ListItemIcon
        onClick={() => {
          trpc.notification.read
            .mutate({
              id: targetId,
              read: !value,
            })
            .then((result) => {
              setRead(result.read);
            });
        }}
      >
        <Tooltip
          title={value ? "未読にする" : "既読にする"}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <Checkbox
            checked={value}
            tabIndex={-1}
            disableRipple={true}
            inputProps={{ "aria-labelledby": title }}
          />
        </Tooltip>
      </ListItemIcon>
      <ListItemText primary={title} secondary={content} />
    </ListItem>
  );
};
