function RegistrationViewModel () {
    var self = this;
    self.firstName = ko.observable();
    self.registrationFormSubmit = function (formRootElement) {
        console.log(self.firstName());
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

//$('#registrationForm').submit(function (e) {
//    e.preventDefault();
//    console.log('Form submitting...');
//    console.log($('#first-name').val());
//});