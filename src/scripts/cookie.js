function writeCookie(name, value) {
    document.cookie = buildCookieString(name, value, {
        domain: '',
        secure: '',
        samesite: '',
        path: ''
    });
};

function readCookie(name) {
    const rows = document.cookie.split(';');
    for (const row of rows) {
        const [key, val] = row.split('=');
        const cookieKey = decodeURIComponent(key.trim().toLowerCase());
        if (cookieKey === name.toLowerCase()) {
            return decodeURIComponent(val);
        }
    }
    return '';
};

function buildCookieString(name, value, options) {
    let expires;
    if (!value) {
        expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
        value = '';
    }
    else {
        expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
    }

    let str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += options.domain ? ';domain=' + options.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += options.secure ? ';secure' : '';
    str += options.samesite ? ';samesite=' + options.samesite : '';
    str += options.path ? ';path=' + options.path : '';

    const cookieLength = str.length + 1;
    if (cookieLength > 4096) {
        console.warn('Cookie name possibly not set or overflowed because it was too large!');
    }
    return str;
};