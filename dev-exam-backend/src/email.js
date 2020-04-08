const nodeMailer = require('nodemailer')
const config = require('config')

const sendEmail = (emailBody) => {

    console.log(emailBody)

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'dev.exam.email@gmail.com',
            pass: 'Dev-exam334'
        }
    });
    let mailOptions = {
        from: '"Bruno" <dev.exam.email@gmail.com>', // sender address
        to: config.get('Config.email.emailTo'), // list of receivers
        subject: 'Resultado Avaliação Candidato', // Subject line
        //text: '', // plain text body
        html: emailBody // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = {
    sendEmail: sendEmail
}