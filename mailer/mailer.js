const nodemailer = require('nodemailer');

// Function to send emails to multiple recipients
async function sendEmails(emailsArray, subject, htmlTemplate) {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Change this to your email service provider
        auth: {
            user: 'your_email@gmail.com', // Replace with your email address
            pass: 'your_password' // Replace with your email password or app-specific password
        }
    });

    // Define the email options
    let mailOptions = {
        from: 'Your Name <your_email@gmail.com>',
        to: emailsArray.join(', '), // Join the array of emails into a comma-separated string
        subject: subject,
        html: htmlTemplate
    };

    try {
        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, message: 'Emails sent successfully' };
    } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, message: 'Error sending emails' };
    }
}

module.exports = sendEmails;
