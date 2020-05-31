const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// import routes
const mailRoutes = require("./routes/mail")
const newsRoutes = require("./routes/news")

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connected'));

    // middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(cors());

    // routes middleware

app.use("/api", mailRoutes)
app.use("/api", newsRoutes)



const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
