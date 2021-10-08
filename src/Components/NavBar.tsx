//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React       from 'react';
import { useState }     from 'react'
import AppBar           from '@mui/material/AppBar';
import Box              from '@mui/material/Box';
import Toolbar          from '@mui/material/Toolbar';
import Typography       from '@mui/material/Typography';
import IconButton       from '@mui/material/IconButton';
import AccountCircle    from '@mui/icons-material/AccountCircle';
import MenuItem         from '@mui/material/MenuItem';
import Menu             from '@mui/material/Menu';

import LocalPizzaIcon   from '@mui/icons-material/LocalPizza';
import SettingsIcon     from '@mui/icons-material/Settings';


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const NavBar = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    //-----------------------------------------------------------------
    // Eventhandler Methods Section
    //-----------------------------------------------------------------
    const handleMenu = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    //-----------------------------------------------------------------
    const handleClose = () => {
      setAnchorEl(null);
    };

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <LocalPizzaIcon
                                style={{
                                    color: 'orange'
                                }}
                            />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            dontWait Admin UI
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <SettingsIcon
                                        style={{
                                            color: '#eee'
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle
                                        style={{
                                            color: 'orange'
                                        }}
                                    />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default NavBar;
