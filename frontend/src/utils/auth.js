import { useAuthStore } from "../store/auths";

import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import apiInstance from "./axios";

export const login = async (email, password) => {
    try {
        const { data, status } = await apiInstance.post("user/token/", { email, password });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);
            // Alert - Sign in Succesfully
        }

        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data?.detail || error.message };
    }
};

export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data } = await apiInstance.post("user/register/", {
            full_name,
            email,
            phone,
            password,
            password2,
        });
        //await login(email, password)
        // Alert - Signed up successfully
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data?.detail || error.message };
    }
};

export const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    useAuthStore.setState({ allUserData: null });
    // Alert - You have been logged out
};

export const setUser = async () => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!access_token && !refresh_token) {
        return;
    }

    if (isAccessTokenExpired(access_token)) {
        const response = await getRefreshToken(refresh_token);
        setAuthUser(response.data.access, response.data.refresh);
    } else {
        setAuthUser(access_token, refresh_token);
    }
};

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set("access_token", access_token, {
        expires: 1,
        secure: true,
    });
    Cookies.set("refresh_token", refresh_token, {
        expires: 7,
        secure: true,
    });
    const user = jwt_decode(access_token) ?? null;
    console.log("Decoded User", user);

    if (user) {
        console.log("Updating store with user", user);
        useAuthStore.getState().setUser(user);
        console.log("Store updated", useAuthStore.getState().user());
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get("refresh_token");
    const response = await axios.post("user/token/refresh/", {
        refresh: refresh_token,
    });
    return response.data;
};

export const isAccessTokenExpired = (access_token) => {
    try {
        const decodedToken = jwt_decode(access_token);
        return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
        console.log(error);
        return false;
    }
};
