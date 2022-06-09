import React, {useContext, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../img/star.png'
import {useHistory} from "react-router-dom"
import {BASKET_ROUTE, DEVICE_ROUTE} from "../utils/consts";
import "../styles/devicePage.css";
import {addDeviceToCart} from "../http/cartApi";
import {Context} from "../index";
import CreateProducts from "./modals/CreateProducts";
import FavoriteIcon from '@mui/icons-material/Favorite';

const DeviceItem = ({handleOpen,myDevice,device}) => {
    const { basket} = useContext(Context)
    const [deviceVisible, setDeviceVisible] = useState(false)

    console.log(device, 'device')
    const img = JSON.parse(device.img)
    const history = useHistory()
    const pushToCart = (event, device) => {
        event.stopPropagation()
        addDeviceToCart({basketId: basket?.cartId, deviceId: device.id}).then(data => console.log(data))
    }
    const editDevice = (event , device) => {
        setDeviceVisible(true)
        event.stopPropagation()
    }

    return (
        <span style={{width: '29%'}}>
        <Col md={6} className={"mt-1"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="products-card-styles"
                  border={"light"}>
                <Image width={300} height={300} className="card-device-item-styles"
                       src={process.env.REACT_APP_API_URL + img.img0}/>
                <div className="mt-3 p-2 d-flex justify-content-center align-items-center flex-column">
                    <div className="two-rows-elipsis-product-name">{device.name}</div>
                    <div className="two-rows-elipsis">{device.description}</div>


                    {myDevice ?
                        <div
                         onClick={(event) => editDevice(event, device)}>
                           Edit
                   </div>
                        : <div
                        onClick={(event) => pushToCart(event, device)} className="card-price-basket-align">
                        <div>{device.price} грн.</div>
                        <FavoriteIcon sx={{mr: 0.5}} className="favorite-border-icon"/>

                    </div>}

                </div>
                {/*{myDevice ?*/}
                {/*    <div*/}
                {/*        onClick={(event) => editDevice(event, device)}>*/}
                {/*        Edit*/}
                {/*    </div>*/}
                {/*    : <div*/}
                {/*        onClick={(event) => pushToCart(event, device)}>*/}
                {/*        Cart*/}
                {/*    </div>}*/}
            </Card>
        </Col>
            <CreateProducts data={device} type={'edit'} show={deviceVisible}
                            onHide={() => setDeviceVisible(false)}/></span>
    );
};

export default DeviceItem;