function RegistrationViewModel () {
    var self = this;
    self.firstName = ko.observable();
    self.registrationFormSubmit = function (formRootElement) {
        var $btn = $('.button');
        var loadingText = $btn.data('loading-text');
        var buttonText = $btn.data('button-text');
        $btn.text(loadingText).addClass('disabled');
        console.log(self.firstName());        
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

//$('#registrationForm').submit(function (e) {
//    e.preventDefault();
//    console.log('Form submitting...');
//    console.log($('#first-name').val());
//});