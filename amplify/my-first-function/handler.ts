import AWS from 'aws-sdk';
const SES = new AWS.SES();

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      console.error('Validation failed');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required.' })
      };
    }

    const emailParams = {
      Source: 'derrick.weil@hotmail.com', // Replace with your verified email
      Destination: {
        ToAddresses: ['derrick.weil@hotmail.com'], // Replace with your recipient email
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

    const result = await SES.sendEmail(emailParams).promise();
    console.log('Email sent successfully:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
