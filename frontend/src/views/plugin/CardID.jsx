import React from "react";

function CardID() {
    const generateRandomString = () => {
        const length = 30;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        localStorage.setItem("randomString", randomString);
    };

    const existingRandomString = localStorage.getItem("randomString");
    if (!existingRandomString) {
        generateRandomString();
    } else {
        // console.log("Random String already exists:", existingRandomString);
    }

    return existingRandomString;
}

export default CardID;
