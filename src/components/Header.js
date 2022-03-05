import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "../features/user/userSlice";

export default function Header({ contactsCount }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contacts Generator Sample Project
          </Typography>
          <AccountCircle />
          <Typography>Generated Contacts: {contactsCount}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
