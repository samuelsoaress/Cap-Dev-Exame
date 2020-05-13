const nodeMailer = require('nodemailer')
const config = require('config')

const sendEmail = (email2) => {

    console.log(email2)

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
        from: '"Avaliação Capgemini" <dev.exam.email@gmail.com>', // sender address
        to: config.get('Config.email.emailTo'), // list of receivers
        subject: 'Resultado Avaliação Candidato', // Subject line
        //text: '', // plain text body
        // html body
        attachments: email2.attachments
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

const sendCandidate = (emailbody, email) => {
    return new Promise((resolve, reject) => {
        console.log(emailbody)
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: 'dev.exam.email@gmail.com',
                pass: 'Dev-exam334'
            }
        });
        let mailOptions = {
            from: '"Avaliação Capgemini" <dev.exam.email@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Avaliação Skill Capgemini', // Subject line
            html: emailbody
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve('Message %s sent: %s', info.messageId, info.response)
        });
    });
}




module.exports = {
    sendEmail: sendEmail,
}