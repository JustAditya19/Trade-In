const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tradein", require("./routes/tradeinRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/webhook", require("./routes/webhookRoutes"));

app.use(errorHandler);

module.exports = app;