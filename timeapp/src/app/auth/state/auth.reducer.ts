import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, logout } from "./auth.actions";
import { initialState } from "./auth.state";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            user: action.user
        };
    }),
    on(logout, (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        }
    })
);

export function AuthReducer(state: any, action: Action) {
    return _authReducer(state, action);
}