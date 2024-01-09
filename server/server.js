require('dotenv').config()
const express = require('express')
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const db = require("./model");
const app = express()

app.use(express.json());
app.use(cors());

//Middleware
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(dbConfig.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

require("./routes/idolRoutes")(app);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});