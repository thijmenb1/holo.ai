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

// Use the `body-parser` middleware to parse incoming requests as JSON
app.use(bodyParser.json());

// Endpoint to handle incoming Alexa requests
app.post('/alexa', (req, res) => {
  // Create an Alexa handler with the request and response objects
  const alexa = Alexa.handler(req.body, res);

  // Set your skill's App ID here
  alexa.appId = process.env.APP_ID;

  // Register your Alexa handlers
  alexa.registerHandlers(handlers);

  // Execute the Alexa handler
  alexa.execute();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
