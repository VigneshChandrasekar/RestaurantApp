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
        registerUser({
            Email: self.email(),
            FirstName: self.firstName(),
            LastName: self.lastName(),
            Phone: self.phoneNumber(),
            Password: self.password(),
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