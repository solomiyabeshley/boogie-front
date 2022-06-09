import React, {useContext, useState} from 'react';
import {Container} from "react-bootstrap";
import Button from '@mui/material/Button';

import CreateBrand from "../components/modals/CreateBrand";
import CreateProducts from "../components/modals/CreateProducts";
import CreateType from "../components/modals/CreateType";
import {Context} from "../index";
import {createTheme, FormControl, FormGroup, Input, InputLabel} from '@mui/material';
import {toJS} from "mobx";
import {Card} from "@mui/material";
import {useLocation} from "react-router-dom";
import {ADMIN} from "../utils/consts";
import "../styles/admin.css";
import {editUser} from "../http/userAPI";
import Footer from "../components/footer";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(166,196,177)'
        }
    }
});
const Admin = () => {
    const location = useLocation()
    const {user} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [phone, setPhone] = useState('')
    const [deviceVisible, setDeviceVisible] = useState(false)
    const isAdmin = location.pathname === ADMIN
    const profile = toJS(user._userData)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(profile)
        const obj = {
            ...profile,
            firstname: event.target[0].value,
            surname: event.target[1].value,
            email: event.target[2].value,
            phone: event.target[3].value,
        }
        await editUser(obj);
    }

    return (
        <div>
            <Container className="d-flex flex-column admin-page-general-container">
                <h3 align="center" style={{color: 'rgba(24,44,37,0.93)'}}>{profile.firstname}, вітаємо
                    на сайті Boogie!</h3>
                <div className="admin-page-general-mockup">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <FormGroup className="admin-page-contacts-left">
                            <Card className="flex-column admin-page-card-stylisation"
                                  sx={{width: '30vw', margin: 'auto', marginTop: '1vw'}}>
                                <h3 align="center" style={{color: 'rgba(24,44,37,0.93)', fontWeight: 'bold'}}>Контактні
                                    дані</h3>

                                <FormControl>
                                    <InputLabel htmlFor="name" sx={{marginLeft: '8%'}}>Ім'я</InputLabel>
                                    <Input id="name" aria-describedby="my-helper-text" defaultValue={profile.firstname}
                                           placeholder="ім'я" className="admin-form-control" theme={theme}/>
                                    {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="lastName" sx={{marginLeft: '8%'}}>Прізвище</InputLabel>

                                    <Input id="lastName" aria-describedby="my-helper-text"
                                           defaultValue={profile.surname}
                                           placeholder="прізвище" className="admin-form-control" theme={theme}/>
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="email" sx={{marginLeft: '8%'}}>Електронна адреса</InputLabel>
                                    <Input id="email" aria-describedby="my-helper-text" defaultValue={profile.email}
                                           placeholder="email" className="admin-form-control" theme={theme}/>
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="phone" sx={{marginLeft: '8%'}}
                                                value={phone} size="small" onChange={e => setPhone(e.target.value)}
                                    >Додати номер телефону</InputLabel>
                                    <Input id="phone" aria-describedby="my-helper-text" placeholder="номер телефону"
                                           defaultValue={profile.phone}
                                           className="admin-form-control" theme={theme}/>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    className="mt-4 p-2  admin-btn-change-user-data"
                                    type="submit">
                                    Зберегти зміни
                                </Button>
                            </Card>
                        </FormGroup>
                    </form>

                    <div className="admin-page-add-commodity-right">
                        {user.isAdmin ?
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Button
                                    variant="contained"
                                    className="mt-4 p-2 admin-add-products-button"
                                    onClick={() => setTypeVisible(true)}
                                >
                                    Додати категорію
                                </Button>
                                <Button
                                    variant="contained"
                                    className="mt-4 p-2 admin-add-products-button"
                                    onClick={() => setBrandVisible(true)}
                                >
                                    Додати підкатегорію
                                </Button>
                            </div>
                            :
                            null
                        }
                        <Button
                            variant="contained"
                            className="mt-4 p-2 admin-add-products-button"
                            onClick={() => setDeviceVisible(true)}
                        >
                            Додати товар
                        </Button>
                        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                        <CreateProducts show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                    </div>

                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default Admin;