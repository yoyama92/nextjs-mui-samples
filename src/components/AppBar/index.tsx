"use client";

import { usePopover } from "@/hooks/usePopover";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { Session } from "next-auth";
import Image from "next/image";
import { useMemo } from "react";

export const PrimaryAppBar = ({
  user,
}: {
  user: Session["user"];
}) => {
  const userPopover = usePopover<HTMLButtonElement>();

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
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
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
      <Menu
        anchorEl={userPopover.anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted={true}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={userPopover.open}
        onClose={userPopover.handleClose}
      >
        {renderMenu}
      </Menu>
    </Box>
  );
};
