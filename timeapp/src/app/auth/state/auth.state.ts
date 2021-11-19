import { User } from "src/app/core/models/user.model";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}