//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React                       from 'react'
import { BrowserRouter }                from 'react-router-dom'
import useMediaQuery                    from '@mui/material/useMediaQuery'
import { createTheme }                  from '@mui/material/styles'
import { ThemeProvider }                from '@mui/material/styles'
import { Provider as ReduxProvider  }    from 'react-redux'
import store                            from './Redux/store'

import styled                           from 'styled-components'

import NavBar                           from './Components/NavBar'
import SideBar                          from './Components/SideBar'
import ContentPanel                     from './Components/ContentPanel'



//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const MainLayout = styled.div`
    display: flex;
    flex-direction: row;
`


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const App = () => {

    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light'
                },
            }),
        [prefersDarkMode],
    );

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <ReduxProvider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <NavBar/>
                    <MainLayout>
                        <SideBar/>
                        <ContentPanel/>
                    </MainLayout>
                </ThemeProvider>
            </BrowserRouter>
        </ReduxProvider>
    )
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default App;
