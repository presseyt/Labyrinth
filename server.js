
require('dotenv').config();
const ENV            = process.env.ENV || "development";

// Set the port to 3001
const PORT = process.env.PORT || 3001;

// Create a new express server
const express = require('express');
const app = express();

//Mount public routes:
app.use(express.static("public"));


app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

