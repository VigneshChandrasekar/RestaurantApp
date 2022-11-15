function RegistrationViewModel () {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.email = ko.observable();
    self.phoneNumber = ko.observable();
    self.password = ko.observable();

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
            },
            error: function (xhr, status, message) {
                console.log("error getting response", status, message);                               
            }
        });

        $btn.text(buttonText).removeClass('disabled');
    };
};

$(function () {
    var registrationFormRootElement = document.getElementById('registrationcomponent');
    if (registrationFormRootElement) {
        var componentModel = new RegistrationViewModel();
        ko.applyBindings(componentModel, registrationFormRootElement);
        console.log('Binding applied for Registration Component');
    }       
});