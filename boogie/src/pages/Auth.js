import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Box, Button, Card, Container, FormControl, Input, InputLabel, Typography} from "@mui/material";
import SvgButton from "../components/SvgButton";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Auth = observer(() => {
    const {user, basket} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data)
                user.setUserData(data?.userData)
                basket.setCartId(data?.basketId)

            } else {
                const data = await registration(email, password, firstName, surname);
                user.setUserData(data?.userData)

            }
            user.setIsAuth(true)
            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <div className="auth-body-design">
            <Card sx={{width: '30vw', margin: 'auto', marginTop: '1vw', backgroundColor: "#fafafa"}}>

                <Typography variant={'h4'} style={{textAlign: 'center', marginTop: '5%'}}>Вітаємо в Boogie!</Typography>
                <Typography variant={'h5'}
                            style={{
                                textAlign: 'center',
                                marginTop: '2%'
                            }}>{isLogin ? 'Вхід' : "Реєстрація"}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1.6,
                    m: 1,
                    bgcolor: '#fafafa',
                }}>
                    {!isLogin && <FormControl sx={{margin: "1% 7%"}}><InputLabel htmlFor="name">Ім'я</InputLabel>
                        <Input id="name" value={firstName} size="small" onChange={e => setFirstName(e.target.value)}/>
                    </FormControl>}

                    {!isLogin &&
                        <FormControl sx={{margin: "1% 7%"}}><InputLabel htmlFor="second_name">Прізвище</InputLabel>
                            <Input id="second_name" size="small" value={surname}
                                   onChange={e => setSurname(e.target.value)}/>
                        </FormControl>}

                    <FormControl sx={{margin: "1% 7%"}}><InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" size="small" type='email' value={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </FormControl>

                    <FormControl sx={{margin: "1% 7%"}}><InputLabel htmlFor="password">Пароль</InputLabel>
                        <Input id="password" size="small" type="password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </FormControl>

                    <div>
                        {isLogin ?
                            <div style={{margin: "2% 7%"}}>
                                Все ще немає аккаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь!</NavLink>
                            </div>
                            :
                            <div style={{margin: "2% 7%"}}>
                                Вже зареєстровані? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                            </div>
                        }
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '4%'}}>
                            <SvgButton
                                value={isLogin ? 'Увійти' : 'Зареєструватися'}
                                onClick={click}
                            >
                            </SvgButton>
                        </div>
                    </div>

                </Box>
            </Card>
        </div>
    );
});

export default Auth;