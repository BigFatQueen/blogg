/** @format */

import * as React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuthContext } from "../context/AuthContext";

export default function IconButtons() {
  const theme = useTheme();
  const ismatch = useMediaQuery(theme.breakpoints.up("md"));
  const { user } = useAuthContext();

  const history = useHistory();
  return (
    <Stack direction="row" spacing={3}>
      <IconButton aria-label="home" onClick={() => history.push("/home")}>
        <HomeIcon />
      </IconButton>
      <IconButton aria-label="mail">
        <EmailIcon />
      </IconButton>
      <IconButton
        aria-label="make a post"
        onClick={() => history.push("/post-create")}>
        <ControlPointIcon />
      </IconButton>
      <IconButton aria-label="get notification">
        <NotificationsIcon />
      </IconButton>
      <IconButton
        aria-label="personal incormaton"
        onClick={() => {
          user.role === "creator"
            ? history.push(`/creator-profile/${user.profile_url}`)
            : history.push(`/creator-edit`);
        }}>
        <AccountCircleIcon />
      </IconButton>
    </Stack>
  );
}
