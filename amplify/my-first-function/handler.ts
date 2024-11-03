import AWS from 'aws-sdk';

const SES = new AWS.SES();

exports.handler = async (event: any) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required.' })
      };
    }

    const emailParams = {
      Source: 'your-verified-email@example.com', // Replace with your verified email
      Destination: {
        ToAddresses: ['recipient-email@example.com'], // Replace with your recipient email
      },
      Message: {
        Subject: {
          Data: 'New Contact Form Submission'
        },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
          }
        }
      }
    };

    await SES.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
