import * as Nodemailer from 'nodemailer';
import { env } from 'process';

interface SendEmailParams {
  email: string,
  url: string,
  message?: string,
  buttonText?: string
  subject?: string
  companyName?: string,
  template?: (url: string)=> string,
}
// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail({ email, url, subject = "Account Verification", template = confirmEmailTemplate }: SendEmailParams): Promise<any> {

  let transporter = Nodemailer.createTransport({
    name: "www.banjnetdigital.com",  //www.agronigeria.ng
    host: "mail.banjnetdigital.com",  //mail.agronigeria.ng
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreply@banjnetdigital.com", //no-reply@agronigeria.ng
      pass: "Noreply.202317", //AgroNigA!!en90
    },
  });

  let mailDetails = {
    from: 'noreply@banjnetdigital.com',
    to: `${email}`,
    subject: `${subject} Link`,
    text: 'Follow the instructions below',
    html: template(url)
  };
  let info = await transporter.sendMail(mailDetails);
  if (info) {
    return {
      success: true,
      message: `Email sent`
    }
  }

}

const confirmEmailTemplate = (url: string) =>{
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <p>Click on the button below to verify your email address</p>
      <a
      href="${url}"
      target="_blank"
      style="display: block; width: 250px; border-radius: 25px; border: 1px solid #1942D8; background: #1942D8; color: white; margin: 30px auto; text-align: center; padding: 15px 0px">
        Confirm Email
      </a>
      <p style="line-height: 1.3rem;">
      Thanks <br />
      <em>Peniga</em>
      </p>
  </div>
  `
}

export const TradeRequestNotificationTemplate = (url: string) =>{
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <p> You have a new trade request </p>
      <p>Click on the button below to view trade request</p>
      <a
      href="${url}"
      target="_blank"
      style="display: block; width: 250px; border-radius: 25px; border: 1px solid #1942D8; background: #1942D8; color: white; margin: 30px auto; text-align: center; padding: 15px 0px">
        View Trade Request
      </a>
      <p style="line-height: 1.3rem;">
      Thanks <br />
      <em>Peniga</em>
      </p>
  </div>
  `
}

export const TradeRequestAcceptanceTemplate = (url: string) =>{
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <p> Your trade request has been accepted</p>
      <p>Click on the button below to view trade</p>
      <a
      href="${url}"
      target="_blank"
      style="display: block; width: 250px; border-radius: 25px; border: 1px solid #1942D8; background: #1942D8; color: white; margin: 30px auto; text-align: center; padding: 15px 0px">
        View Trade
      </a>
      <p style="line-height: 1.3rem;">
      Thanks <br />
      <em>Peniga</em>
      </p>
  </div>
  `
}

export const TradeRequestDeclineTemplate = (url: string) =>{
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <p> Your trade request has been declined</p>
      <p>Click on the button below to view trade</p>
      <a
      href="${url}"
      target="_blank"
      style="display: block; width: 250px; border-radius: 25px; border: 1px solid #1942D8; background: #1942D8; color: white; margin: 30px auto; text-align: center; padding: 15px 0px">
        View Trade
      </a>
      <p style="line-height: 1.3rem;">
      Thanks <br />
      <em>Peniga</em>
      </p>
  </div>
  `
}

export const TradeRequestCancellationTemplate = (url: string) =>{
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1>${process.env.COMPANY_NAME}</h1>
      <p> Your trade has been cancelled by seller</p>
      <p>Click on the button below to view trade</p>
      <a
      href="${url}"
      target="_blank"
      style="display: block; width: 250px; border-radius: 25px; border: 1px solid #1942D8; background: #1942D8; color: white; margin: 30px auto; text-align: center; padding: 15px 0px">
        View Trade
      </a>
      <p style="line-height: 1.3rem;">
      Thanks <br />
      <em>Peniga</em>
      </p>
  </div>
  `
}