const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")
const nodemailer = require("nodemailer")

exports.sendEmail = catchAsync(async (req, res, next) => {
  if (req.headers.auth === process.env.EMAIL_FORM_AUTH) {
    const senderEmail = req.body.email
    const senderName = req.body.name
    const topic = req.body.title
    const content = req.body.message

    const output = `<p>${content}</p>
`
    const outputResponse = `
<h3>Witaj, ${senderName}</h3>
<p>Dziękuję za wysłanie wiadomości z formularza na stronie <i>W cieniu brzóz...</i><br>
Odpowiem na nią najszybciej jak to możliwe.</p><p>Pozdrawiam,<br>Dana</p><br><br>
<small>Ta wiadomość została wygenerowana automatycznie, proszę na nią nie odpowiadać.</small>
`
    const outputNotify = `
<h4>Nowa wiadomość z formularza:</h4>
<p>Od: ${senderName}</p>
<p>email: ${senderEmail}</p>
<p>Temat: ${topic}</p>
<p>Przeczytaj całą wiadomość: <a href="webmail.wcieniubrzoz.pl">otwórz klienta poczty</a></p>
`

    const txt = `${content}`
    const txtResponse = `Witaj, ${senderName}\n Dziękuję za wysłanie wiadomości z formularza na stronie W cieniu brzóz... Odpowiem na nią najszybciej jak to możliwe. \n\nPozdrawiam, \nDana</p><br><br> \n\n Ta wiadomość została wygenerowana automatycznie, proszę na nią nie odpowiadać.`
    const txtNotify = `Nowa wiadomość z formularza, od: ${senderName}\n email: ${senderEmail}. \n\nPrzeczytaj wiadomość na stronie: webmail.wcieniubrzoz.pl`

    // create  transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.wcieniubrzoz.pl",
      port: 465,
      secure: true,
      auth: {
        user: "kontakt@wcieniubrzoz.pl",
        pass: process.env.EMAIL_CLIENT_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // send actual email
    let info = await transporter.sendMail({
      from: `${senderName}<${senderEmail}>`,
      to: "kontakt@wcieniubrzoz.pl",
      subject: `${topic}`,
      text: txt,
      html: output,
    })
    // send confirmation email
    await transporter.sendMail({
      from: "W cieniu brzóz...<kontakt@wcieniubrzoz.pl>",
      to: `${senderName}<${senderEmail}>`,
      subject: `Wiadomość: ${topic} została wysłana`,
      text: txtResponse,
      html: outputResponse,
    })
    // send new email notification
    await transporter.sendMail({
      from: "W cieniu brzóz...<kontakt@wcieniubrzoz.pl>",
      to: `danuta.pietrzykowska@gmail.com`,
      subject: `Ktoś wysłał do Ciebie wiadomość: ${topic}`,
      text: txtNotify,
      html: outputNotify,
    })
    res.status(200).json({
      status: "success",
      message: "email has been sent",
      envelope: info.envelope,
      accepted: info.accepted,
    })
  } else {
    return next(new AppError("Email form authorization string rejected", 401))
  }
})
