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
    subject: `New Query: ${data.name} (${data.email})`,
    text: `New Query\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\n\nMessage:\n${data.message}\n`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="background-color: #0284c7; padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">New Query</h1>
          <p style="color: #e0f2fe; margin: 4px 0 0 0; font-size: 14px;">From: <strong>${data.name}</strong> (${data.email})</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 120px; font-weight: 600;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0 6px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message:</td>
              <td style="padding: 12px 0 6px 0; color: #334155; white-space: pre-wrap; line-height: 1.6;">${data.message}</td>
            </tr>
          </table>
        </div>

        <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent automatically via Sri Management Consultancy contact form.
        </p>
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
    replyTo: data.email,
    subject: `New Registration: ${data.name} (${data.email})`,
    text: `New Registration\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nType: ${data.userType === 'company' ? 'Company' : 'Individual Trainee'}\n${data.userType === 'company' && data.company ? `Company: ${data.company}\n` : ''}${data.serviceType ? `Service Type: ${data.serviceType}\n` : ''}Standard: ${data.standard}\nMessage: ${data.message || 'No additional message'}\n`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="background-color: #059669; padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">New Registration</h1>
          <p style="color: #d1fae5; margin: 4px 0 0 0; font-size: 14px;">From: <strong>${data.name}</strong> (${data.email})</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 140px; font-weight: 600;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${data.email}" style="color: #059669; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.phone ? `+91 ${data.phone}` : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Type:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.userType === 'company' ? 'Company' : 'Individual Trainee'}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Company Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Standard:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; color: #059669;">${data.standard}</td>
            </tr>
            ${data.serviceType ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Service Type:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.serviceType}</td>
            </tr>` : ''}
            ${data.message ? `
            <tr>
              <td style="padding: 12px 0 6px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message:</td>
              <td style="padding: 12px 0 6px 0; color: #334155; white-space: pre-wrap; line-height: 1.6;">${data.message}</td>
            </tr>` : ''}
          </table>
        </div>

        <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent automatically via Sri Management Consultancy registration system.
        </p>
      </div>
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


