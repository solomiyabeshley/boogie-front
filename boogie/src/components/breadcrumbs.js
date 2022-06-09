import React, {useState} from 'react';
import {Breadcrumbs, Typography} from "@mui/material";
import "./style/navBar.css"


const BreadcrumbsNavBar = () => {

    return (
        <div className="App">
            <div className="products-navbar">
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography>
                            Home
                        </Typography>
                        <Typography>...</Typography>
                        <Typography>Breadcrumbs</Typography>
                    </Breadcrumbs>
                </div>
                <div>{'< Prev | Next >'}</div>
            </div>
        </div>
    );
}


export default BreadcrumbsNavBar;