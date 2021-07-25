import { createContext, useReducer } from "react";
import { AuthReducer, INITIAL_STATE } from './AuthReducer';


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}