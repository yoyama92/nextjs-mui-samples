"use client";

import { usePopover } from "@/hooks/usePopover";
import { trpc } from "@/trpc/client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Divider, List, Popover } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { Session } from "next-auth";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { NotificationListItem } from "./notificationListItem";

export const PrimaryAppBar = ({
  user,
}: {
  user: Session["user"];
}) => {
  const userMenu = usePopover<HTMLButtonElement>();
  const useNotifications = usePopover<HTMLButtonElement>();

  const menuId = "primary-search-account-menu";

  const [notifications, setNotifications] = useState<
    {
      id: number;
      targetId: number;
      title: string;
      content: string;
      read: boolean;
    }[]
  >([]);

  useEffect(() => {
    trpc.notification.findList.query().then((result) => {
      setNotifications(result);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap={true} component="div">
            MUI
          </Typography>
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={useNotifications.handleOpen}
              ref={useNotifications.anchorRef}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={userMenu.handleOpen}
              ref={userMenu.anchorRef}
            >
              {user.image ? (
                <Avatar alt="account image" src={user.image} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        anchorEl={userMenu.anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={userMenu.open}
        onClose={userMenu.handleClose}
      >
        <Box
          sx={{
            padding: 1,
          }}
        >
          {user.image && (
            <Image
              src={user.image}
              alt="account image"
              width={42}
              height={42}
            />
          )}
          <Typography variant="body1" component="div">
            名前：{user.name}
          </Typography>
          <Typography variant="body1" component="div">
            メールアドレス：{user.email}
          </Typography>
          <Typography variant="body1" component="div">
            ロール：{user.role}
          </Typography>
        </Box>
      </Popover>
      <Popover
        open={useNotifications.open}
        anchorEl={useNotifications.anchorRef.current}
        onClose={useNotifications.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography variant="h6">Notifications</Typography>
        </Box>
        {notifications.length > 0 ? (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: "background.paper",
            }}
          >
            {notifications.map(({ id, ...notification }, index) => {
              return (
                <Fragment key={id}>
                  {index !== 0 && <Divider />}
                  <NotificationListItem {...notification} />
                </Fragment>
              );
            })}
          </List>
        ) : (
          <Box
            sx={{
              padding: 1,
            }}
          >
            通知がありません。
          </Box>
        )}
      </Popover>
    </Box>
  );
};
