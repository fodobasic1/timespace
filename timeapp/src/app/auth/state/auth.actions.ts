import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export const LOGIN_START = '[auth] login start';
export const LOGIN_SUCCESS = '[auth] login success';

export const AUTO_LOGIN_FAILED = '[auth] auto login failed';
export const AUTO_LOGIN = '[auth] auto login';
export const LOGOUT = '[auth] logout';

export const loginStart = createAction(
    LOGIN_START,
    props<{
        username: string,
        password: string,
        apiguid: string
    }>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{
        user: User,
        redirect: boolean
    }>()
);

export const autoLogin = createAction(
    AUTO_LOGIN
);

export const autoLoginFailed = createAction(
    AUTO_LOGIN_FAILED
);

export const logout = createAction(
    LOGOUT
)