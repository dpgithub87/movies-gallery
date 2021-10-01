import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";

const Navigation: FunctionComponent = () => {

    return (
        <> 
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap component="div">
            Movies Gallery
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft:'80%' } }}>
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
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              //onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> 
        </>
    );
};

Navigation.propTypes = {};

export default Navigation;