//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React           from 'react';
import { NavLink }          from 'react-router-dom'
import Typography           from '@mui/material/Typography'
import styled               from 'styled-components'

import DashboardIcon        from '@mui/icons-material/Dashboard';
import RestaurantIcon       from '@mui/icons-material/Restaurant'
import RestaurantMenuIcon   from '@mui/icons-material/RestaurantMenu'
import CategoryIcon         from '@mui/icons-material/Category'
import ReceiptIcon          from '@mui/icons-material/Receipt';
import ShoppingBagIcon      from '@mui/icons-material/ShoppingBag'
import ReviewsIcon          from '@mui/icons-material/Reviews'
import PeopleIcon           from '@mui/icons-material/People'


//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const SideBarContainer = styled.div`
    width: 250px;
    min-width: 250px;
    height: calc(100vh - 60px);
    background-color: #252525;
    box-shadow: 10px 2px 20px -10px rgba(0,0,0,0.69);
    padding-top: 10px;
`
const NavLinkStyled = styled.ul`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
    }

    li {
        display: flex;
        align-items: center;
        color: white;
        margin: 0 0.8rem;
        font-size: 1.0rem;
        position: relative;
        list-style: none;
        margin-bottom: 30px;
    }

    .current {
        li {
            color: orange;
        }
    }
`
const TextLink = styled.span`
    margin-left: 10px;
`

//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const SideBar = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const links = [
        {name: "Dashboard",   icon: <DashboardIcon/>, path:"/"},
        {name: "Restaurants", icon: <RestaurantIcon/>, path:"/restaurants"},
        {name: "Menu Items",  icon: <RestaurantMenuIcon/>, path:"/menu-items"},
        {name: "Categories",  icon: <CategoryIcon/>, path:"/categories"},
        {name: "Transactions",icon: <ReceiptIcon/>, path:"/transactions"},
        {name: "Orders",      icon: <ShoppingBagIcon/>, path:"/orders"},
        {name: "Reviews",     icon: <ReviewsIcon/>, path:"/reviews"},
        {name: "Users",       icon: <PeopleIcon/>, path:"/users"}
    ]

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <SideBarContainer>
                <NavLinkStyled>
                    {links.map((link,index) => (
                        <NavLink key={index} to={link.path} exact activeClassName="current">
                            <li>
                                {link.icon}
                                <TextLink>
                                    <Typography>
                                        {link.name}
                                    </Typography>
                                </TextLink>
                            </li>
                        </NavLink>
                    ))}
                </NavLinkStyled>
        </SideBarContainer>
    )
}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default SideBar;
