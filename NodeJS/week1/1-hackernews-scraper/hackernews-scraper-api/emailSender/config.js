module.exports = {
    transporterOptions: {
        service: 'gmail',
        auth: {
            user: 'hackernewsapiemail@gmail.com',
            pass: 'test123email'
        }
    },
    confirmationUrl: 'http://localhost:8080/confirm/:id',
    anchor: '<a href="href"> Confirm your subscription </a>'
};