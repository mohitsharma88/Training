
var http = require("http");
const { getMaxListeners } = require("process");

http.createServer(function (request, response) {
    "use strict";
    const nodemailer = require("nodemailer");
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "demo830870@gmail.com", // generated ethereal user
          pass: "Demo@123", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Image Sample 👻" <demo830870@gmail.com>', // sender address
        to: "mohitsharma.mrr@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject linenode
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        
          
      

      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
    main().catch(console.error);
    

}).listen(3000);
console.log("Server Started! at   ");