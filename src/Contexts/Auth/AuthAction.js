import axios from "axios";
import config from '../../config.json';


export const LoginSuccess = async (dataLogin, dispatch) => {
    try {
        const res = await axios.post(config.API_URL + `auth/login`, dataLogin);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });
        localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
        console.log(err.response.data.error);
    }
}