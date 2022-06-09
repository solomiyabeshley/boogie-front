import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import "../styles/Basket.css";
import {changeCount, deleteDevice, fetchBasketDevices} from "../http/cartApi";
import Image from "react-bootstrap/Image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from "../components/footer";
// import RandomPhrases from "../components/categoryNavBar";
const Basket = () => {
    const {user, basket} = useContext(Context)
    const [basketDevice, setBasketDevice] = useState({})
    useEffect(() => {
        fetchBasketDevices(basket.cartId).then(data => setBasketDevice(data))
    }, [])
    const handleClickDelete = (device) => {
        deleteDevice(device.id).then(data => {
                const rows = basketDevice.rows.filter((res) => res.id !== +data.id)
                setBasketDevice({...basketDevice, rows})

            }
        )
    }

    const handleChangeCount = (device, count) => {
        changeCount({id: device.id, count}).then(data => {
                const rows = basketDevice.rows.map((res) => {
                    if (res.id === data.id) {
                        return {...res, count: data.count}
                    } else return res
                })
                setBasketDevice({...basketDevice, rows})
            }
        )
    }
    let totalPrice = 0
    let sale = 0
    const arrOfBasketDevice = []
    basketDevice?.rows?.map((res => {
        let haveSale
        totalPrice = totalPrice + (res?.count * res.device?.price)
        if (res.device?.saleCount <= res?.count) {
            console.log(res)
            sale = Math.round((sale + ((res.count * res.device?.price) / 100) * res.device.percents) * 100) / 100
            haveSale = true
        }
        const img = res.device?.img ? JSON.parse(res.device?.img) : null
        arrOfBasketDevice.push(
            <div className="card-basket">

                <Image width={175} height={175} className="card-device-item-styles-basket"
                       src={process.env.REACT_APP_API_URL + img?.img0}/>

                <div className="basket-price-name-styles">
                    <div className="two-rows-elipsis-product-name-basket">{res.device?.name}</div>
                    <div><b>Ціна:</b> {res.device?.price} грн.</div>
                    <div><b>Загальна вартість:</b> {res.device?.price * res.count} грн.</div>
                    <div><b>Знижка</b> діє від: {res.device?.saleCount} товарів</div>
                    {haveSale ?
                        <div><b>Знижка:</b> {res.device?.percents} %</div> : null
                    }
                </div>


                <div className="card-basket-add-remove-products">

                    <div className="add-remove-products-basket">

                        <button onClick={() => handleChangeCount(res, res.count - 1)}
                                className="remove-buttons-styles add-remove-hover-style">

                            <RemoveIcon sx={{mr: 0.5}} fontSize="inherit" titleAccess="Зменшити"/>

                        </button>

                        <div className="remove-buttons-styles">{res.count}</div>

                        <button onClick={() => handleChangeCount(res, res.count + 1)}
                                className="remove-buttons-styles add-remove-hover-style">
                            <AddIcon sx={{mr: 0.5}} fontSize="inherit" titleAccess="Збільшити"/>
                        </button>

                    </div>
                </div>


                <div className="basket-total-product-price">{res.device?.price * res.count} грн.</div>

                <button onClick={() => handleClickDelete(res)} className="remove-buttons-styles remove-products-align">
                    <ClearIcon sx={{mr: 0.5}} fontSize="medium" titleAccess="Видалити"
                               className="svg-button-basket"/>
                </button>
            </div>
        )
    }))
    return (
        <div>
            <div className="basket-container">
                <div className="basket-content">
                    <div>
                        <h1><FavoriteBorderIcon sx={{mr: 0.5}} fontSize="inherit" className="order-icon-style"/>
                            Обрані товари</h1>
                    </div>
                    <div className="top-line-styles"/>
                    {arrOfBasketDevice}
                </div>
                <div className="basket-order">
                    <h3 className="basket-order-h3-line" align="center">Деталі замовлення</h3>

                    <div className="total-product-price-box total-product-price-box-p">
                        <h6>Сума:</h6> <b>{totalPrice} грн.</b>
                    </div>
                    <div className="total-product-price-box total-product-price-box-p" style={{color: 'red'}}>
                        <h6>Знижка:</h6> <b>{sale} грн.</b>
                    </div>
                    <div className="basket-order-bottom-line"/>

                    <div className="total-product-price-box">
                        <h5>Разом</h5> <b>{totalPrice - sale} грн.</b>
                    </div>

                    <button className="checkout-order-button">Оформити замовлення</button>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Basket;