const express = require('express');
const Response = require('./utils/response');
const { ApplicationError } = require("./utils/custom-error");

//import routes
const route = require('./routes/routes');

// app
const app = express();
const port = process.env.PORT || 8000;

// error handler for invalid JSON payload
app.use((req, res, next) => {
    express.json({
        verify: (req, res, buffer) => {
            req.rawBody = buffer.toString();
        }
    })(req, res, (err) => {
        if (err) {
            new Response(req, res).errorResponse(400, "Invalid JSON payload passed.")
        }
        next();
    })
});

app.use(route);

// error handler
app.use((err, req, res, next) => {
    if (err instanceof ApplicationError)
        return new Response(req, res).errorResponse(400, err.message);
        
    return new Response(req, res).errorResponse(500, `An error occurred while processing your request. !!!`);
});

//error handler for all 404 errors
app.use((req, res, next) => {
    new Response(req, res).errorResponse(404, 'Unable to find the requested resource!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;