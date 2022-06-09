import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col, Image} from "react-bootstrap";
import {Context} from "../../index";
import {
    addFiles,
    createDevice,
    deleteFiles,
    fetchBrands,
    fetchDevices,
    fetchTypes,
    updateDevice
} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import "../style/buttons.css";
import "../../styles/createProduct.css";
import {InputLabel, Paper} from "@mui/material";

const CreateProducts = observer(({data,type, show, onHide}) => {
    const {user,device} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands(data?.typeId).then(data => device.setBrands(data))

    }, [])
    let initialState
    if (data && type === 'edit') {
        let typeIndex = device.types.map(function(e) { return e.id; }).indexOf(data.typeId);
        let brandIndex = device.brands.map(function(e) { return e.id; }).indexOf(data.brandId);
        const parsedImgs = data?.img ? JSON.parse(data?.img) : null
        const img = []
        for (const key in parsedImgs) {
            img.push(parsedImgs[key])
        }
        initialState = {
            color: data.color,
            condition: data.condition,
            count: data.count,
            typeState: device.types[typeIndex],
            brand: device.brands[brandIndex],
            description: data.description,
            img: img,
            name: data.name,
            percents: data.percents,
            price: data.price,
            saleCount: data.saleCount,
        }
    }else {
        initialState = {
            color: null,
            condition: null,
            count: 1,
            description: '',
            typeState: null,
            brand: null,
            img: [],
            name: '',
            percents: null,
            price: 0,
            saleCount: null,
        }
    }
    const isEdit = type === 'edit'
    const [name, setName] = useState(initialState.name)
    const [typeState, setType] = useState(initialState.typeState)
    const [brand, setBrand] = useState(initialState.brand)
    const [price, setPrice] = useState(initialState.price)
    const [count, setCount] = useState(initialState.count)
    const [percents, setPercents] = useState(initialState.percents)
    const [saleCount, setSaleCount] = useState(initialState.saleCount)
    const [color, setColor] = useState(initialState.color)
    const [condition, setCondition] = useState(initialState.condition)
    const [description, setDescription] = useState(initialState.description)
    const [file, setFile] = useState(initialState.img)
    const [info, setInfo] = useState([])

let imgs = []
    if (!file.length){
        imgs = []
    }

file?.map(res => {
    imgs.push(
        <div>
            <img src={process.env.REACT_APP_API_URL + res} width={'40px'} alt={'das'}/>
            <div onClick={() => deleteFile(res)}>x</div>
        </div>)
})

    const handleClickSetTypes = (type) => {
        setType(type)
        fetchBrands(type?.id).then(data => device.setBrands(data))
    }
    const closewindow = () => {
        if (!isEdit){
            let params = {data: file}
            deleteFiles(params).then(data => {
                setFile([])
                onHide()
            })
        }else {
            onHide()
        }

    }

    const deleteFile = (id) => {
        let params = {}
        if (isEdit) params = {data: [id], deviceId: data.id }
        else params = {data: [id]}

        deleteFiles(params).then(data => setFile(file.filter(res => res !== data)))
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    const selectFile = e => {
        const formDataFiles = new FormData()
        for (const key in e.target.files) {
            formDataFiles.append(`img${key}`, e.target.files[key])
        }
        addFiles(formDataFiles).then(data => setFile(file.concat(data)))
    }




        const addDevice = () => {
        console.log(file)

        const formData = new FormData()
            console.log(file)
            formData.append('file', JSON.stringify(file))
            formData.append('name', name)
            formData.append('userId', user.userData.id)
            formData.append('price', `${price}`)
            formData.append('count', `${count}`)
            formData.append('percents', `${percents}`)
            formData.append('saleCount', `${saleCount}`)
            formData.append('color', `${color}`)
            formData.append('condition', `${condition}`)
            formData.append('description', description)
            formData.append('brandId', brand.id)
            formData.append('typeId', typeState.id)
            formData.append('info', JSON.stringify(info))
        console.log(formData)

        {isEdit ?
            updateDevice(formData, data.id).then(data => onHide())
            :
            createDevice(formData).then(data => onHide())
        }    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isEdit ? 'Редагувати товар': 'Додати товар'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="css-MuiButtonBase-root-btns">
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle
                                className="css-MuiButtonBase-root-MuiButton-root">
                                {typeState?.name || "Виберіть категорію"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() =>  handleClickSetTypes(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle
                                className="css-MuiButtonBase-root-MuiButton-root">
                                {brand?.name || "Виберіть підкатегорію"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device?.brands?.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => setBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                    <div>
                        <InputLabel htmlFor="price" className="add-price-form">Назва товару:</InputLabel>

                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder="Назва"
                        />
                    </div>
                    <div className="d-flex">
                    <div >
                        <InputLabel htmlFor="price" className="add-price-form">Вартість (грн):</InputLabel>
                        <Form.Control
                            value={price}
                            id="price"
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-3 add-price-form-field"
                            placeholder="Вартість"
                            type="text"
                        />
                    </div>
                        <div >
                            <InputLabel htmlFor="price" className="add-price-form">Кількість</InputLabel>
                            <Form.Control
                                value={count}
                                id="price"
                                onChange={e => setCount(Number(e.target.value))}
                                className="mt-3 add-price-form-field"
                                placeholder="Кількість"
                                type="number"
                            />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="color" className="add-price-form">Колір</InputLabel>
                        <Form.Control
                            value={color}
                            id="color"
                            onChange={e => setColor(e.target.value)}
                            className="mt-3 "
                            type="text"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="sale" className="add-price-form">Знижка</InputLabel>
                        <div className="add-sale">
                        <Form.Control
                            value={percents}
                            id={'sale'}
                            onChange={e => setPercents(Number(e.target.value))}
                            className="mt-3 percents"
                            placeholder="%"
                        />
                        <Form.Control
                            value={saleCount}
                            id={'sale'}
                            onChange={e => setSaleCount(Number(e.target.value))}
                            className="mt-3 sale"
                            placeholder="Від скількох одини"
                        />
                        </div>
                    </div>
                    <div>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle
                                className="css-MuiButtonBase-root-MuiButton-root">
                                { condition || "Виберіть стан товару"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => setCondition(' Б/У')}
                                    >
                                        Б/У
                                    </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => setCondition('Новий')}
                                >
                                    Новий
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <InputLabel htmlFor="description" className="add-price-form">Опис</InputLabel>

                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                                onChange={e => setDescription(e.target.value)}
                                value={description}

                            />
                    </div>
                    <div>
                        <InputLabel htmlFor="price" className="add-price-form">Завантажити зображення:</InputLabel>
                        <Form.Control
                        className="mt-3 form-control-file"
                        type="file"
                        onChange={selectFile}
                        multiple
                    />
                        {imgs?.length ? <div>
                            {imgs}
                        </div> : null}
                    </div>
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Додати характеристику товару
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Властивість"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Опис"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => closewindow()}>Закрити</Button>
                <Button variant="outline-success" onClick={addDevice}>{isEdit ? 'Редагувати' :'Додати'}</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProducts;