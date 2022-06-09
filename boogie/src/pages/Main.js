import React, {useContext} from 'react';
import "../styles/homepage.css"
import {Carousel, Col, Row} from "react-bootstrap";
import Banner1 from "../img/banner-1.jpg";
import Banner2 from "../img/banner-2.jpg";
import Banner3 from "../img/banner-3.jpg";
import logo from "../img/small_logo2.png";
import BoogieLogo from "../components/images/logos/Blogo_big1.png";
import Flag from "../img/flag.png";
import {NavLink} from "react-router-dom";
import {DEVICE_ROUTE, MY_DEVICES_ROUTE, SHOP_ROUTE} from "../utils/consts";

import {Context} from "../index";



const Main = () => {
    const {device} = useContext(Context)

    return (
        <div>
            <Carousel autoPlay={true} className="carousel-homepage-styles">
                <Carousel.Item
                    interval={10000}
                >
                    <img
                        className="d-block w-100  carousel-homepage-styles-img"
                        src={Banner1}
                        alt="First slide"
                    />
                    <Carousel.Caption className="carousel-homepage-styles">
                        <div className="carousel-homepage-styles-caption">
                            <h1>Вітаємо на сайті</h1>
                            <img src={BoogieLogo} alt="Boogie" style={{width: "25%"}}/>
                            <h4>Шопінг має дарувати задоволення!</h4>
                            <h3>Купуй українське <img src={Flag} style={{width: "5%"}}/></h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item
                    interval={10000}
                >
                    <img
                        className="d-block w-100 carousel-homepage-styles-img"
                        src={Banner3}
                        alt="Second slide"
                    />

                    <Carousel.Caption className="carousel-homepage-styles">
                        <div className="carousel-homepage-styles-caption-slide2">

                            <img src={logo} width="10%"/>
                            <h5>Boogie — великий вибір товарів у каталозі для зручного онлайн-шопінгу.</h5>
                            <h4 className="h4-padding">Переглянути каталог товарів</h4>

                            <NavLink to={SHOP_ROUTE}>
                                <button className="carousel-slide2-button">Каталог</button>
                            </NavLink>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item
                    interval={10000}>
                    <img
                        className="d-block w-100 carousel-homepage-styles-img"
                        src={Banner2}
                        alt="Third slide"/>

                    <Carousel.Caption className="carousel-homepage-styles">
                        <div className="carousel-homepage-styles-caption-slide2">

                            <img src={logo} width="15%"/>
                            <h5>Товари, які потішать усю сім’ю!</h5>
                            <h4 className="h4-padding">Ваші оголошення</h4>
                            <NavLink to={MY_DEVICES_ROUTE}>
                                <button
                                    className="carousel-slide2-button">Каталог
                                </button>
                            </NavLink>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


            <div>

            </div>


        </div>
    );
}


export default Main;