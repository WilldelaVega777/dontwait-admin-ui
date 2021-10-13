//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useState }             from 'react'
import { forwardRef }           from 'react'
import AppBar                   from '@mui/material/AppBar'
import Box                      from '@mui/material/Box'
import Toolbar                  from '@mui/material/Toolbar'
import Typography               from '@mui/material/Typography'
import IconButton               from '@mui/material/IconButton'
import AccountCircle            from '@mui/icons-material/AccountCircle'
import MenuItem                 from '@mui/material/MenuItem'
import Menu                     from '@mui/material/Menu'
import LinearProgress           from '@mui/material/LinearProgress'
import Snackbar                 from '@mui/material/Snackbar'
import { SnackbarOrigin }       from '@mui/material/Snackbar'
import MuiAlert                 from '@mui/material/Alert'
import { AlertProps }           from '@mui/material/Alert'
import styled                   from 'styled-components'
import LocalPizzaIcon           from '@mui/icons-material/LocalPizza'
import SettingsIcon             from '@mui/icons-material/Settings'
import { useAppDispatch }       from '../Hooks/useRedux'
import { useAppSelector }       from '../Hooks/useRedux'
import { clearError }           from '../Redux/Reducers/system.reducer'

//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const LinearProgressStyled = styled(LinearProgress)`
    margin-top: -5px !important;
`

//---------------------------------------------------------------------
// Interfaces Section
//---------------------------------------------------------------------
export interface State extends SnackbarOrigin {
  open: boolean;
}

//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const NavBar = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    // Component States
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    // Redux Dispatch Function
    const dispatch = useAppDispatch()

    // Redux Slice
    const {
        showLoading,
        showError
    } = useAppSelector(state => state.system)

    // UI Subcomponents
    const Alert =
        forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
            return (
                <MuiAlert
                    elevation={6}
                    ref={ref}
                    variant="filled"
                    {...props}
                />
            )
        }
    )

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
    const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            console.log('clickaway')
            return
        }
        console.log('not clickaway')
        dispatch(clearError())
    }

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
                                    aria-label="Settings"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
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
            {showLoading && <LinearProgressStyled/>}
            <Snackbar
                open={Boolean(showError) as boolean}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div>
                    <Alert
                        onClose={handleSnackClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        { showError }
                    </Alert>
                </div>
            </Snackbar>
        </div>
    );
}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default NavBar;
