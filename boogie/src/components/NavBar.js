import React, {useContext, useState} from 'react';
import {Context} from "../index";
import "./style/navBar.css"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    SHOP_ROUTE,
    MY_DEVICES_ROUTE
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import SvgButton from "../components/SvgButton";
import CreateProducts from "./modals/CreateProducts";
import addLogo from "../img/add.png"
import CreateBrand from "./modals/CreateBrand";
import CreateType from "./modals/CreateType";
import BoogieLogo from "./images/logos/Blogo_big1.png";
import {Button} from "@mui/material";

import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const logOut = () => {
        user.setUserData({})
        localStorage.removeItem('token')
        user.setIsAuth(false)
        history.push(MAIN_ROUTE)
    }

    return (
        <div>
            <Navbar>
                <Container className="navbar-container">


                    <div className="main-nav-links">
                        <NavLink className="navlink-admin-text-style" to={MY_DEVICES_ROUTE}>
                            <ViewListIcon sx={{margin: '5px', color: 'rgba(0,0,0,0.65)'}}/>Мої товари</NavLink>
                        <NavLink className="navlink-admin-text-style" to={BASKET_ROUTE}>
                            <ShoppingBasketIcon sx={{margin: '5px', color: 'rgba(0,0,0,0.65)'}}/>Корзина</NavLink>
                        <NavLink className="navlink-admin-text-style" to={SHOP_ROUTE}>
                            <AutoAwesomeMosaicIcon sx={{margin: '5px', color: 'rgba(0,0,0,0.65)'}}/>Каталог</NavLink>
                        <NavLink className="navlink-admin-text-style" to={MAIN_ROUTE}>
                            <HomeIcon sx={{margin: '5px', color: 'rgba(0,0,0,0.65)'}}/>Головна</NavLink>

                        <div className="header-boogie-logo">
                            <NavLink className="navlink-admin-text-style" to={MAIN_ROUTE}>
                                <img src={BoogieLogo} alt="Boogie" style={{width: "17%"}}/>
                            </NavLink>
                        </div>
                    </div>

                    <div className="logo-auth-styles">

                        <Button variant="text" onClick={() => setDeviceVisible(true)}
                                className="navlink-admin-text-style">
                            Додати оголошення
                        </Button>

                        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                        <CreateProducts type={'create'} show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>


                        {user.isAuth ?
                            <Nav className="navlink-admin-style">
                                <NavLink to={ADMIN_ROUTE} className="navlink-admin-text-style navlink-admin-text-style-admin"
                                         >
                                    <AccountCircleIcon sx={{margin: '5px', color: 'rgba(0,0,0,0.65)'}} fontSize={'large'}/>
                                    Особистий кабінет
                                </NavLink>
                                <SvgButton value={'Вийти'}
                                           onClick={() => logOut()}
                                />

                            </Nav>
                            :
                            <Nav>
                                <SvgButton onClick={() => history.push(LOGIN_ROUTE)} value={'Авторизація'}/>
                            </Nav>
                        }
                    </div>

                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;