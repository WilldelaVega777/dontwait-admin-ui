//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { Switch }               from 'react-router-dom'
import { Route }                from 'react-router-dom'

import Typography               from '@mui/material/Typography'

import styled                   from 'styled-components'

import Home                     from '../Pages/Home'
import Categories               from '../Pages/Categories'
import Transactions             from '../Pages/Transactions'
import MenuItems                from '../Pages/MenuItems'
import Orders                   from '../Pages/Orders'
import Restaurants              from '../Pages/Restaurants'
import Reviews                  from '../Pages/Reviews'
import Users                    from '../Pages/Users'


//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const ContentContainerStyled = styled.div`
    min-height: calc(100vh - 112px);
    width: calc(100vw - 250px);
    color: white;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 50px;
`


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const ContentPanel = () => {
    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <Typography>
            <ContentContainerStyled>
                <Switch>
                    <Route exact path="/"        component={Home}/>
                    <Route path="/restaurants"  component={Restaurants}/>
                    <Route path="/menu-items"   component={MenuItems}/>
                    <Route path="/categories"   component={Categories}/>
                    <Route path="/transactions" component={Transactions}/>
                    <Route path="/orders"       component={Orders}/>
                    <Route path="/reviews"      component={Reviews}/>
                    <Route path="/users"        component={Users}/>
                </Switch>
            </ContentContainerStyled>
        </Typography>
    )
}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default ContentPanel

