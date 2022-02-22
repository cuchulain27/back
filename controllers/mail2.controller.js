const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendMail2 = async (req, res) => {
    let form = req.body.form ?? undefined;

    console.log(form)

    if (!form) {
        return res.status(403).send({ message: "No se han recibido todos los parámetros", success: false })
    }
    let name = form.user.name ?? undefined;
    let mail = form.user.mail ?? undefined;
    let empresa = form.user.empresa ?? undefined;
    let area = form.user.area ?? undefined;
    let charge = form.user.charge ?? undefined;
    let interests = form.interest ?? [];
    let industria = form.user.industria ?? undefined; 
    let trabajadores = form.user.trabajadores ?? undefined;
    let phone = form.user.phone ?? undefined;
    


    if (!name || !mail || !empresa || !area || !charge || interests.length == 0 || !industria || !trabajadores|| !phone) {
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
            user: process.env.MAILUSER, // generated ethereal user
            pass: process.env.MAILPASS, // generated ethereal password
        },
    });


    // send mail with defined transport object
    let info = await transporter.sendMail2({
        from: `"MG Certifica " <${mail}>`, // sender address
        to: "contactomg@mgcertifica.cl", // list of receivers
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
                <h1 style="margin-left:10px" >formulario de contacto</h1>
                <ul>
                    <li>nombre: ${name}</li>
                    <li>email: ${mail}</li>
                    <li>empresa: ${empresa}</li>
                    <li>area: ${area}</li>
                    <li>cargo: ${charge}</li>
                    <li>intereses: ${interests}</li>
                    <li>industria: ${industria}</li>
                    <li>trabajadores: ${trabajadores}</li>
                    <li>fono: ${phone}</li>

                </ul>
            
            </td>
        </tr>
        <tr style="margin-top:50px; padding-bottom:50px">
            <td style="border:1px; width:220px; height:50px; background-color:#d9232f; color:white; text-align:center; margin-left:190px; margin-top:80px">
            </td>
        </tr>
       
    </tbody>

        
        <h1>formulario de contacto</h1>
        <ul>
             
           

        </ul>
        
        `, // html body
    });


    return res.status(200).send({ message: "¡Gracias por llenar el formulario! Un ejecutivo de nuestro equipo te contactará muy pronto.", success:true })



}
