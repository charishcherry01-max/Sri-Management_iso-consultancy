import nodemailer from 'nodemailer';

// Create a reusable transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactQueryEmail = async (data: { name: string; email: string; phone?: string; message: string }) => {
  const companyEmail = process.env.COMPANY_EMAIL || 'sri.qci@gmail.com';
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Missing email configuration variables.");
    return false;
  }

  const mailOptions = {
    from: `"Sri Management Query" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    replyTo: data.email,
    subject: `Query: New Contact Message from ${data.name}`,
    text: `Query Details:\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}\n\nMessage:\n${data.message}\n`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; line-height: 1.6;">
        <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">Query: New Contact Message</h2>
        <p>A new customer inquiry has been received through the website contact form:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 130px;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${data.phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 13px; color: #64748b;">This query was sent automatically from the srimanagement.in contact form.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Query email sent: %s', info.messageId);
    return true;
  } catch (error: any) {
    console.error('Error sending query email:', error.message);
    return false;
  }
};

export const sendRegistrationEmail = async (data: any) => {
  const companyEmail = process.env.COMPANY_EMAIL || 'sri.qci@gmail.com';
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Missing email configuration variables.");
    return false;
  }

  const mailOptions = {
    from: `"Sri Management System" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    subject: `New Client Registration / Inquiry: ${data.name}`,
    text: `A new registration has been received.\n\nType: ${data.userType === 'company' ? 'Company' : 'Individual Trainee'}\nName: ${data.name}\nEmail: ${data.email}\nPhone: +91 ${data.phone}\n${data.userType === 'company' ? `Company: ${data.company}\nService Type: ${data.serviceType}\n` : ''}Standard: ${data.standard}\nMessage: ${data.message || 'No message provided'}\n\nPlease review their registration in the dashboard.`,
    html: `
      <h2>New Registration / Inquiry</h2>
      <p>A new registration has been submitted on the platform.</p>
      <ul>
        <li><strong>Registration Type:</strong> ${data.userType === 'company' ? 'Company' : 'Individual Trainee'}</li>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> +91 ${data.phone}</li>
        ${data.userType === 'company' ? `<li><strong>Company:</strong> ${data.company}</li>` : ''}
        <li><strong>Requested Standard:</strong> ${data.standard}</li>
        ${data.userType === 'company' ? `<li><strong>Requested Service:</strong> ${data.serviceType}</li>` : ''}
      </ul>
      ${data.message ? `<p><strong>Additional Details:</strong><br/>${data.message}</p>` : ''}
      <p>Please review their registration in the dashboard.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Registration email sent: %s', info.messageId);
    return true;
  } catch (error: any) {
    console.error('Error sending registration email:', error.message);
    return false;
  }
};


