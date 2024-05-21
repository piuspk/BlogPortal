const mongoose = require('mongoose');
const URL = process.env.URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Successfully Connected to Database!!"))
.catch((error) => console.error("error", error));
