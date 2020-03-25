const mailer = require('nodemailer');

const getEmailData = (to, name) => {
    let data = null;

    data = {
        from: "leo-fravega@hotmail.com",
        to:`${to}`,
        subject: `Welcome ${name}`,
        text: `Hello ${name} welcome to Weather Station`
    }
         
    return data;
}


const sendEmail = (to, name) =>{

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "webweatherstation@gmail.com",       //Casilla de correo que emitira el email
            pass: "Tata1451"
        }
    })

    const mail = getEmailData(to, name);

    console.log(mail)

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error)
        } else {
            console.log(`Email sent successfully at ${mail.to}`)
        }
        smtpTransport.close();
    })

}

module.exports = {sendEmail}