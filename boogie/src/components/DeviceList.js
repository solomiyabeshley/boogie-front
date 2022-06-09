import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import CreateProducts from "./modals/CreateProducts";

const DeviceList = observer((myDevice) => {
    const {device} = useContext(Context)


    return (
        <Row className="d-flex">
            {device.devices.map((device) =>
                    <DeviceItem  myDevice={myDevice} key={device.id} device={device} className="devices-width"/>

                )}
        </Row>
    );
});

export default DeviceList;