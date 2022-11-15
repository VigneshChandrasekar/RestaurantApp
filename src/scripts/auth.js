var accessTokenCookieName = '.access-token';

function setAccessToken(accessToken) {
    parseJwt(accessToken);
    writeCookie(accessTokenCookieName, accessToken);
};

function getAccessToken() {    
    return readCookie(accessTokenCookieName);
};

function registerUser(user) {    
    try {
        $.ajax({
            type: 'POST',
            url: 'https://sandboxapi.ordercloud.io/oauth/token',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            async: true,
            data: {
                client_id: "68583AF0-A4C8-497B-A3A8-F179A0D8E207",
                client_secret: "9xwiqzc48nyZDVJ2bCajovMNlMjuYxa2Fx6KkFLtOOCuSIOdCSeRSkgvcULt",
                grant_type: "client_credentials"
            },
            datatype: 'json',
            cache: false,
            success: function (data) {
                if (data.access_token) {
                    console.log('Authenticated Successfully.');
                    parseJwt(data.access_token);
                    accessToken = data.access_token;
                    if (accessToken) {
                        $.ajax({
                            type: 'POST',
                            url: 'https://sandboxapi.ordercloud.io/v1/buyers/Shoppers/users',
                            headers: {                                
                                "Authorization": "Bearer " + accessToken
                            },
                            contentType: "application/json",
                            data: {
                                Active: true,
                                Username: "test@ty.com",
                                Password: "Google@123",
                                FirstName: "Vignesh",
                                LastName: "Chandrasekar",
                                Email: "test@ty.com",
                                Phone: "9500547521"
                            },
                            datatype: 'json',
                            cache: false,
                            async: true,
                            success: function (data) {
                                if (data) {
                                    console.log('User Created Successfully.');
                                    console.log(data);
                                }
                            },
                            error: function (xhr, status, message) {
                                console.log("error getting response", status, message);
                            }
                        });
                    }
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