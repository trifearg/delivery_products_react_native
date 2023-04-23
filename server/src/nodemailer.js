const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'stas.tuzov@internet.ru',
      pass: 'Nodemaler12_12'
    },
  },
  {
    from: 'Mailer Test <stas.tuzov@internet.ru>',
  })

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err.message)
    console.log('Message: ', info)
  })
}

module.exports = mailer;
