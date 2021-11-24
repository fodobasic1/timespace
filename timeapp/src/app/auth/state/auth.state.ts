import { ServerResponseData } from "src/app/core/models/serverResponse.model";

export interface AuthState {
    isAuthenticated: boolean;
    user: ServerResponseData | null;
    errorMessage: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
}