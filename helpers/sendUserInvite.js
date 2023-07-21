const emailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporters = emailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PWD,
  },
});

const sendUserInvite = async (name, email, password, link) => {
  try {
    let data = await transporters.sendMail({
      from: { name: process.env.SMTP_EMAIL, address: process.env.SMTP_EMAIL },
      to: email,
      subject: "Akwa Cloud | Account Activation",
      html: `
        <div style="background-color: black;  padding :20px; ">
    <p style="color: white;">Hello ${name},</p>
    <br>
    <p style="color: white;">Your account has been created.</p>
    <p style="color: white;">Here is your Username/Email: ${email}</p>
    <br>
    <p style="color: white;">To access the system, click the link below to create your password for your account activation.</p>
    <br>
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td style="border-radius: 2px;" bgcolor="#ED2939">
                <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939; border-radius: 2px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; font-weight:bold; display: inline-block;">
                  Create Password
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <br>
    <p style="color: white;">The above link is valid within 24hrs only.</p>
    <br>
    <p style="color: white;">If you have any questions about your account or any other matter, please feel free to contact us at support@akwameter.com</p>
    <br>
    <p style="color: white;">Best regards,</p>
    <br>
    <p style="color: white;">The Akwa Cloud Platform Support Team.</p>
    <p style="color: white;">Powered by Wayatek</p>
  </div>
  `,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendUserInvite;