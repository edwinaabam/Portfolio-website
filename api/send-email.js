import { Resend } from 'resend';

// This line securely gets your key from the server's settings.
// DO NOT paste your key here.
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await resend.emails.send({
      // This is where your test email goes
      from: 'Portfolio Form <onboarding@resend.dev>',
      
      // This is your personal email where you receive the message
      to: 'abam.edwina@gmail.com', 
      
      subject: `New Message from ${name} (Portfolio)`,
      reply_to: email, 
      html: `
        <h3>New Portfolio Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully!', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message', details: error.message });
  }
}