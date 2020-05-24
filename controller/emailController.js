const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")
const nodemailer = require("nodemailer")

exports.pingEmail = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
    message: "hit to GET email route and controller successful",
  })
})

exports.sendEmail = catchAsync(async (req, res, next) => {
  if (req.headers.auth === process.env.EMAIL_FORM_AUTH) {
    const output = `
<h4>Wiadomość z formularza W cieniu brzóz:</4>
<p>Od: ${req.body.name}</p>
<p>email: ${req.body.email}</p>
<h3>${req.body.title}</h3>
<p>${req.body.message}</p>
`
    const txt = `Wiadomość ze strony W cieniu brzóz:\n\n Od: ${req.body.name}\n email: ${req.body.email} \n\n${req.body.message}`

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.wcieniubrzoz.pl",
      port: 465,
      secure: true,
      auth: {
        user: "kontakt@wcieniubrzoz.pl",
        pass: "saranda123",
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "W cieniu brzóz...<kontakt@wcieniubrzoz.pl>", // sender address <-- has to be valid for google!!!
      to: "pietrzykowski77@gmail.com", // list of receivers
      subject: `Ktoś wysłał do Ciebie wiadomość :)`, // Subject line
      text: txt, // plain text body
      html: output, // html body
    })
    res.status(200).json({
      status: "success",
      message: "Email sent successfuly",
      envelope: info.envelope,
      accepted: info.accepted,
    })
  } else {
    return next(new AppError("Email form authorization string rejected", 401))
  }
})
