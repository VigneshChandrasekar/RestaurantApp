var accessTokenCookieName = '.access-token';

function setAccessToken(accessToken) {
    parseJwt(accessToken);
    writeCookie(accessTokenCookieName, accessToken);
};

function getAccessToken() {    
    return readCookie(accessTokenCookieName);
};

function getAnononymousToken() {
    let accessToken;
    try {
        $.ajax({
            type: 'POST',
            url: 'https://sandboxapi.ordercloud.io/oauth/token',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                client_id: "68583AF0-A4C8-497B-A3A8-F179A0D8E207",
                client_secret: "9xwiqzc48nyZDVJ2bCajovMNlMjuYxa2Fx6KkFLtOOCuSIOdCSeRSkgvcULt",
                grant_type: "client_credentials"
            },
            datatype: 'json',
            cache: false,
            success: function (data) {                              
                if (data.access_token) {
                    parseJwt(data.access_token);
                    accessToken = data.access_token;
                }
            },
            error: function (xhr, status, message) {
                console.log("error getting response", status, message);
            }
        });
    }
    catch(e) {
        throw new Error('Invalid token');
    }
    return accessToken;
};

function registerUser() {
    let accessToken = getAnononymousToken();
    try {
        $.ajax({
            type: 'POST',
            url: 'https://sandboxapi.ordercloud.io/v1/buyers/Shoppers/users',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            data: {
                "Active": true,
                "Username": "test2@gmail.com",
                "Password": "Google@123",
                "FirstName": "Vignesh",
                "LastName": "Chandrasekar",
                "Email": "test2@gmail.com",
                "Phone": "9500547521"
            },
            datatype: 'json',
            cache: false,
            success: function (data) {
                if (data) {
                    console.log(data);
                }
            },
            error: function (xhr, status, message) {
                console.log("error getting response", status, message);
            }
        });
    }
    catch (e) {
        throw new Error('Invalid request');
    }
    return accessToken;
};

function parseJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    catch (e) {
        throw new Error('Invalid token');
    }
};