$(function () {
    var pathname = window.location.pathname;
    var redirectUrl = '';
    var accessToken = getAccessToken();

    const isValidToken = accessToken && parseJwt(accessToken);

    if (pathname.toLowerCase() === '/registration') {
        if (isValidToken) {
            redirectUrl = '/';
        }
    }
    else if (pathname.toLowerCase() === '/signin') {
        if (isValidToken) {
            redirectUrl = '/';
        }
    }
    else {
        if (!isValidToken) {
            redirectUrl = '/signin';
        }
    }

    if (redirectUrl) {
        window.location.href = redirectUrl;
    }

});