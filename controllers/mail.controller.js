const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendMail = async (req, res) => {
    let form = req.body.form ?? undefined;

    console.log(form)
    
    if (!form) {
        return res.status(403).send({ message: "No se han recibido todos los parámetros", success: false })
    }
    let name = form.user.name ?? undefined;
    let mail = form.user.mail ?? undefined;
    let phone = form.user.phone ?? undefined;
    let charge = form.user.charge ?? undefined;
    let interests = form.interest ?? [];
    let message = form.message ?? undefined;

    if (!name || !mail || !phone || !charge || interests.length == 0 || !message) {
        return res.status(403).send({ message: "No se han recibido todos los parámetros", success: false })
    }

    

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        requireTLS: true, // true for 465, false for other ports
        tls:{
            ciphers:"SSLv3",
            
        },
        
        auth: {
            
            user: 'mtapia@mgcertifica.cl', // generated ethereal user
            pass: 'Devilmaycry4', // generated ethereal password
        },
        
    });


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "mtapia@mgcertifica.cl", // sender address
        to: "mtapia@mgcertifica.cl", // list of receivers
        subject: "Contacto", // Subject line

        html: `
    <tbody>
    <tr>
        <td>
            <img data-imagetype="External" src="https://portal.mgcertifica.cl/NoBorrar/header.png" alt="Logo MG"> 
        </td>
    </tr>
    <tr>
        <td style="padding-bottom:50px; margin-left:10px">
            <h1 style="margin-left:10px" >Datos del contacto</h1>
            <ul>
                <li>nombre: ${name}</li>
                <li>email: ${mail}</li>
                <li>fono: ${phone}</li>
                <li>cargo: ${charge}</li>
                <li>servicios: ${interests}&nbsp</li>
    
            </ul>
            <p  style="margin-top:0; margin-left:10px">mensaje: ${message}</p>
        </td>
    </tr>
    <td>
    <img data-imagetype="External" src="../img/mg.png" alt="Logo MG"> 
     </td>
   
    </tbody>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
   

    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    


    return res.status(200).send({ message: "¡Gracias por llenar el formulario! Un ejecutivo de nuestro equipo te contactará muy pronto.", success:true })




}