import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import "../styles/Basket.css";
import "../styles/shop.css";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import {Card, Container, Dropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import {observer} from "mobx-react-lite";
import SummarizeIcon from '@mui/icons-material/Summarize';
import Footer from "../components/footer";

const MyDevices = observer(() => {
    const {user, basket, device} = useContext(Context)
    const [myDevice, setMyDevice] = useState({})

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchDevices(null, null, 100, 12, user.userData.id).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchBrands(device.selectedType.id || 1).then(data => device.setBrands(data))
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12, user.userData.id).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12, user.userData.id).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (
        <div>
        <Container className="shop-container">
            <Row className="shop-alignment my-devices-alignment">

                <h1 className="shop-container-order-h1-styles">Ваші оголошення</h1>
                <Col md={2} className="shop-category-alignment">
                    {device.brands.map(brand =>
                        <Card
                            style={{cursor: 'pointer', width: "10vw"}}
                            key={brand.id}
                            className="card-brands-styles"
                            onClick={() => device.setSelectedBrand(brand)}
                            bg={brand.id === device.selectedBrand.id ? 'light' : null}>
                        </Card>
                    )}
                </Col>
                <Col md={6} className="shop-products-alignment">
                    <DeviceList myDevice={true}/>
                   <div className="pagination-align-styles-dev"><Pages/></div>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </div>
    );
});

export default MyDevices;