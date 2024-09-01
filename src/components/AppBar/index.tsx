"use client";

import { usePopover } from "@/hooks/usePopover";
import { trpc } from "@/trpc/client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Divider, List, ListItem, ListItemText, Popover } from "@mui/material";
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
import { useMemo } from "react";

export const PrimaryAppBar = ({
  user,
}: {
  user: Session["user"];
}) => {
  const userMenu = usePopover<HTMLButtonElement>();
  const useNotifications = usePopover<HTMLButtonElement>();

  const menuId = "primary-search-account-menu";
  const renderMenu = useMemo(
    () => (
      <Box
        sx={{
          padding: 1,
        }}
      >
        {user.image && (
          <Image src={user.image} alt="account image" width={42} height={42} />
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
    ),
    [user],
  );

  const [notifications, setNotifications] = useState<
    {
      id: number;
      title: string;
      text: string;
    }[]
  >([]);

  useEffect(() => {
    trpc.notification.findList.query().then((result) => {
      setNotifications(result);
    });
  }, []);

  const notificationMenu = useMemo(() => {
    return (
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: "background.paper",
        }}
      >
        {notifications.map(({ id, title, text }, index) => {
          return (
            <Fragment key={id}>
              {index !== 0 && <Divider />}
              <ListItem
                alignItems="flex-start"
                sx={{
                  ":hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                <ListItemText primary={title} secondary={text} />
              </ListItem>
            </Fragment>
          );
        })}
      </List>
    );
  }, [...notifications, notifications.map]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap={true}
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
        {renderMenu}
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
        {notificationMenu}
      </Popover>
    </Box>
  );
};
