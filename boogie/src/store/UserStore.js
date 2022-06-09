import {makeAutoObservable, toJS} from "mobx";
import {ADMIN} from "../utils/consts";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userData = {}
        this._basketId = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setUserData(user) {
        this._userData = user
    }
    setBasketId(basketId) {
        this._basketId = basketId
    }


    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get userData() {
        return this._userData
    }
    get isAdmin() {
        return toJS(this._userData).role === ADMIN;
    }
    get basketId() {
        return this._basketId
    }
}