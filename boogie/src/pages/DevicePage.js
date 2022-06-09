import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, Row} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {Breadcrumbs, Link, Paper} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import {Context} from "../index";
import {addDeviceToCart} from "../http/cartApi";
import "../styles/devicePage.css";
import * as PropTypes from "prop-types";
import "../styles/shop.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Footer from "../components/footer";

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}`;
}

function StarIcon(props) {
    return null;
}

StarIcon.propTypes = {
    fontSize: PropTypes.string,
    style: PropTypes.shape({opacity: PropTypes.number})
};
const DevicePage = () => {
    const history = useHistory();

    const {device, basket} = useContext(Context)

    const [deviceData, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    const imgs = []
    const parsedImgs = deviceData?.img ? JSON.parse(deviceData?.img) : null
    for (const key in parsedImgs) {
        imgs.push(<Paper style={{
            height: '400px', display: 'flex', justifyContent: 'center', boxShadow: 'unset'
        }}><Image key={key} src={process.env.REACT_APP_API_URL + parsedImgs[key]}/></Paper>)
    }

    const pushToCart = () => {
        addDeviceToCart({basketId: basket?.cartId, deviceId: id}).then(data => console.log(data))
    }

    const handleClickType = () => {
        device.setSelectedType(deviceData.type)
        navigateToShop()

    }
    const handleClickBrand = () => {
        device.setSelectedType(deviceData.type)
        device.setSelectedBrand(deviceData.brand)
        navigateToShop()

    }
    const navigateToShop = () => {
        history.push("/shop");


    }
    // const [value, setValue] = React.useState(4);
    // const [hover, setHover] = React.useState(-1);
    console.log(deviceData)

    return (
        <div>
            <Container>
                <div className="products-navbar">
                    <div>

                        <Breadcrumbs separator="›" aria-label="breadcrumb"
                                     className="breadcrumbs-styles">
                            <Link onClick={() => navigateToShop()} underline="hover">
                                <ShoppingCartIcon sx={{mr: 0.5}} fontSize="inherit"/>
                                Shop
                            </Link>
                            <Link onClick={() => handleClickType()} underline="hover">
                                <CategoryIcon sx={{mr: 0.5}} fontSize="inherit"/>
                                {deviceData.type?.name}</Link>
                            <Link onClick={() => handleClickBrand()} underline="hover">
                                <LocalOfferIcon sx={{mr: 0.5}} fontSize="inherit"/>

                                {deviceData.brand?.name}</Link>
                        </Breadcrumbs>

                    </div>

                    <div>{'< Prev | Next >'}</div>

                </div>

                <div className=" dev-page-main-css">
                    <div className="carousel-image-styles">
                        <Carousel variant="dark"
                                  autoPlay={false}
                        >
                            {imgs}
                        </Carousel>
                    </div>

                    <div className="main-device-characteristics">
                        <h1 className="h1-text-stylisation">{deviceData.name}</h1>
                        <h4 className="h4-products-text-decoration">{deviceData.price} грн.</h4>

                        <div className="div-products-text-decoration">
                            <div className="products-text-decoration">Колір:</div>
                            <ColorLensIcon className="color-lens-icon"/>{deviceData.color}</div>
                        <div className="div-products-text-decoration">
                            <div className="products-text-decoration">Стан:</div>
                            {deviceData.condition}</div>
                        <div className="div-products-text-decoration">
                            <div className="products-text-decoration">Кількість:</div>
                            <div className="add-border-to-products-count">{deviceData.count}</div>
                        </div>
                        <div className="div-products-text-decoration">
                            <PriorityHighIcon sx={{mr: 0.5}} className="products-text-decoration-discount"/>
                            Знижка <b>{deviceData.percents} %</b> діє від: <b>{deviceData.saleCount}</b> од. товару
                        </div>

                        <div className="add-to-basket-styles">
                            <Button variant={"outline-dark"} className="add-to-basket-btn" onClick={pushToCart}>Додати в
                                корзину</Button>
                        </div>
                    </div>
                </div>


                <div className="product-description-styles">
                    <div className="d-flex flex-column">
                        <h4 className="h1-text-stylisation">Характеристики та опис товару</h4>
                        {deviceData.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{padding: 3}}>
                                <div className="characteristics-alignment">
                                    <p className="characteristics-alignment-p"
                                       style={{color: 'rgba(61,92,87,0.62)'}}>{info.title}</p>
                                    <p className="characteristics-alignment-p">{info.description}</p>
                                </div>
                            </Row>
                        )}
                    </div>
                    <div>
                        <h5 className="h1-text-stylisation">Опис</h5>
                        {deviceData.description}
                    </div>


                </div>

            </Container>
            <Footer/>
        </div>
    );
};

export default DevicePage;