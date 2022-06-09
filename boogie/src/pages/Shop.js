import React, {useContext, useEffect} from 'react';
import {Card, Container, Dropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import "../styles/shop.css";

import Footer from "../components/footer";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {margin} from "@mui/system";

const Shop = observer(() => {

    const {device, user} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        // fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])
    useEffect(() => {
        fetchBrands(device.selectedType.id || 1).then(data => device.setBrands(data))
        fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType])
    console.log(device?.brands)

    useEffect(() => {
        fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    let arrOfDevice = [];
    let topArrOfTypes= []
    device.types.map((res, index) => {
        if (index < 7) {
            topArrOfTypes.push(
                <Dropdown.Item style={{cursor: 'pointer'}}
                               className="dropdown-item-change-height"
                               active={res.id === device.selectedType.id}
                               onClick={() => device.setSelectedType(res)}
                               key={res.id}>{res.name}</Dropdown.Item>
            )
        }
        arrOfDevice.push(
            <Dropdown.Item style={{cursor: 'pointer'}}
                           className="dropdown-item-change-height"
                           active={res.id === device.selectedType.id}
                           onClick={() => device.setSelectedType(res)}
                           key={res.id}>{res.name}</Dropdown.Item>
        )
    }
    )


    return (
        <div>
            <Container className="shop-container">
                <Row className=" shop-alignment">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                        <div className="category-nav-bar-styles shop-navbar">
                            <a className="navbar-brand">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic"
                                                     className="admin-add-products-button">
                                        Всі категорії
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {arrOfDevice}
                                    </Dropdown.Menu>
                                </Dropdown></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <a className="nav-item nav-link">
                                        <div className="dropdown-category-item">{topArrOfTypes}</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <Col md={2} style={{marginLeft: device?.brands?.length ? '9.2vw' : '14vw'}} className="shop-category-alignment">
                        {device.brands.map(brand =>
                            <Card
                                style={{cursor: 'pointer', width: "10vw",backgroundColor:'rgba(166,196,177,0.24)'}}
                                key={brand.id}
                                className="p-2 card-brands-styles"
                                onClick={() => device.setSelectedBrand(brand)}
                                bg={brand.id === device.selectedBrand.id ? 'light' : null}
                            >
                                <div className="brands-arrow-style"> {brand.name} <ArrowForwardIcon
                                    sx={{color:'#3d5c57',fontSize:'small'}}/></div>

                            </Card>
                        )}
                    </Col>
                    <Col md={5} className="shop-products-alignment">
                        <DeviceList myDevice={false}/>
                        <Pages/>
                    </Col>

                </Row>

            </Container>
            <Footer/>
        </div>
    );
});

export default Shop;