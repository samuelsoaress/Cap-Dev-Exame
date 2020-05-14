const nodeMailer = require('nodemailer')
var nodeoutlook = require('nodejs-nodemailer-outlook')
const config = require('config')



const sendEmail = (email2, Candidato) => {
    console.log("entrou na send outlook")
    try {
        nodeoutlook.sendEmail({
            auth: {
                user: "breno.bastos@capgemini.com",
                pass: ""
            },
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            from: 'breno.bastos@capgemini.com',
            to: email2,
            subject: 'Resultado Avaliação Candidato',
            html: '<b>Segue em anexo o resultado do teste do/a ' + Candidato + '</b>',
            text: 'This is text version!',
            attachments: email2.attachments,

            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        });
    }
    catch (error) {
        console.log(error)
    }
}

const sendEmail2 = (email2) => {

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

const sendCandidate = (emailbody, email, request) => {
    console.log(emailbody)
    nodeoutlook.sendEmail({
        auth: {
            user: "breno.bastos@capgemini.com",
            pass: ""
        },
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        from: 'breno.bastos@capgemini.com',
        to: [email],
        subject: 'Avaliação Skill ' + request['nomeCandidato'],
        html: emailbody,
        text: 'This is text version!',
        attachments: [],

        onError: (e) => console.log(e),

        onSuccess: (i) => console.log(i)
    });
}




module.exports = {
    sendEmail: sendEmail,
    sendCandidate: sendCandidate
}