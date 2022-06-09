import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Footer from "./components/footer";

const App = observer(() => {
    const {user, basket} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            console.log(data, "DATA")
            user.setIsAuth(true)
            user.setUserData(data?.userData)
            basket.setCartId(data?.basketId)

        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            {/*<Footer/>*/}
        </BrowserRouter>
    );
});

export default App;