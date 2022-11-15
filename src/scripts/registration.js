$(function () {
    
});

$('#registrationForm').submit(function (e) {
    e.preventDefault();
    console.log('Form submitting...');
    console.log($('#first-name').val());
});