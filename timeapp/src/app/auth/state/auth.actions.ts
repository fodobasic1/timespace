import { createAction, props } from "@ngrx/store";
import { ServerResponseData } from "src/app/core/models/serverResponse.model";

export const LOGIN_START = '[auth] login start';
export const LOGIN_SUCCESS = '[auth] login success';
export const LOGIN_FAILED = '[auth] login failed';

export const AUTO_LOGIN_FAILED = '[auth] auto login failed';
export const AUTO_LOGIN = '[auth] auto login';
export const LOGOUT = '[auth] logout';

export const loginStart = createAction(
    LOGIN_START,
    props<{
        username: string,
        password: string,
        timeapiguid: string
    }>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{
        response: ServerResponseData,
        redirect: boolean
    }>()
);

export const loginFailed = createAction(
    LOGIN_FAILED,
    props<{ message:string} >()
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