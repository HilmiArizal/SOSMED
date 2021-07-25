export const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
}


export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload };      
        default:
            break;
    }
}