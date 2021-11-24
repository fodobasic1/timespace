import { Action, createReducer, on } from "@ngrx/store";
import { loginFailed, loginSuccess, logout } from "./auth.actions";
import { initialState } from "./auth.state";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            user: action.response,
            errorMessage: null
        };
    }),
    on(loginFailed, (state, action) => {
        return {
            ...state, 
            errorMessage: action.message
        };
    }),
    on(logout, (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
            errorMessage: null
        }
    })
);

export function AuthReducer(state: any, action: Action) {
    return _authReducer(state, action);
}