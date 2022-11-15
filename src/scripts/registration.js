function RegistrationViewModel () {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.email = ko.observable();
    self.phoneNumber = ko.observable();
    self.password = ko.observable();

    var accessTokenCookieName = '.access-token';

    self.registrationFormSubmit = function (formRootElement) {
        var $btn = $('.button');
        var loadingText = $btn.data('loading-text');
        var buttonText = $btn.data('button-text');
        $btn.text(loadingText).addClass('disabled');

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
                console.log(data);
                parseJwt(data.access_token);
                if (data.access_token) {
                    document.cookie = buildCookieString(accessTokenCookieName, data.access_token, {
                        domain: '',
                        secure: '',
                        samesite: '',
                        path: ''
                    });
                }
            },
            error: function (xhr, status, message) {
                console.log("error getting response", status, message);                               
            }
        });

        $btn.text(buttonText).removeClass('disabled');
    };
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
}

$(function () {
    var registrationFormRootElement = document.getElementById('registrationcomponent');
    if (registrationFormRootElement) {
        var componentModel = new RegistrationViewModel();
        ko.applyBindings(componentModel, registrationFormRootElement);
        console.log('Binding applied for Registration Component');
    }       
});

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
}