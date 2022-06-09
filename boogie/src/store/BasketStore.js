import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._cartId = null
        makeAutoObservable(this)
    }

    setCartId(id) {
        console.log(id)
        this._cartId = id
    }

    get cartId() {
        return this._cartId
    }

}