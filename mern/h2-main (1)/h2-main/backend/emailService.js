const nodemailer=require("nodemailer")

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"sivaram@codegnan.com",
        pass:"songyhrwyvrjaatd"
    }
})
module.exports=transporter