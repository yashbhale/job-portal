import nodemailer from "nodemailer";

export const sendJobEmail = async (emails, job, companyName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails, 
    subject: `New Job Opening at ${companyName}`,
    html: `
      <h3>${job.title}</h3>
      <p><b>Company:</b> ${companyName}</p>
      <p><b>Location:</b> ${job.location}</p>
      <p><b>Experience:</b> ${job.minexp}+ years</p>
      <p>${job.description}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
