const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('alexa-sdk');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define Alexa handlers
const handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to your Alexa skill. Ask me something!', 'Try again.');
  },
  'HelloWorldIntent': function () {
    this.emit(':tell', 'Hello, world!');
  },
};

app.post('/alexa', (req, res) => {
  const alexa = Alexa.handler(req.body, res);
  alexa.appId = process.env.APP_ID; // Set your skill's App ID here
  alexa.registerHandlers(handlers);
  alexa.execute();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});