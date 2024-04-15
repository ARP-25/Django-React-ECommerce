import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

function UserData() {
    let access_token = Cookie.get("access_token");
    let refresh_token = Cookie.get("refresh_token");

    if (!access_token || !refresh_token) {
        console.log("User Token does not exist.");
        return null;
    }

    try {
        const decoded = jwtDecode(refresh_token);
        return decoded;
    } catch (error) {
        console.error("Failed to decode access token:", error);
        return null;
    }
}

export default UserData;
