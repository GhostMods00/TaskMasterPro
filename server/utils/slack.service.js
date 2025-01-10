const axios = require('axios');

exports.sendSlackNotification = async (message) => {
  const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
  await axios.post(webhookUrl, { text: message });
};
