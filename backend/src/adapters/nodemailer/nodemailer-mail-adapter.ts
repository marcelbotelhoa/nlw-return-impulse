import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4eb6e0b6949e75",
      pass: "0d5736fb0f73ac"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Marcel Botelho <lero@mail.com>",
        subject,
        html: body,
    });
    };
};