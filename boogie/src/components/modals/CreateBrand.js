import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {createBrand, createType, fetchTypes} from "../../http/deviceAPI";
import "../style/buttons.css";
import {Context} from "../../index";

const CreateBrand = ({show, onHide}) => {
    const {device}=useContext(Context)
    const [value, setValue] = useState('')
    const [typeId, setTypeId] = useState({id:1})

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        // fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addBrand = () => {
        const formData = new FormData()

        createBrand({name: value, typeId: typeId.id}).then(data => {
            setValue('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати підкатегорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle
                            className="css-MuiButtonBase-root-MuiButton-root">
                            {typeId.name || "Виберіть категорію"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => setTypeId({id: type.id, name: type.name})}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть підкатегорію"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addBrand}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;