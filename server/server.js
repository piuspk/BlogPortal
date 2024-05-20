require("dotenv").config();
const { User } = require("./model/user.model");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use('/images', express.static('public/images'));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.BASE_URL, // replace with the origin of your client-side application
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

require("./routes/user.routes")(app);
require("./routes/image.routes")(app);
require("./routes/posts.routes")(app);
require("./routes/comments.routes")(app);

require("./db/db");


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login/success", async (req, res) => {
  console.log("Endpoint hitgg");
  const token = req.cookies.usertoken;
  console.log("token", token)

  if (!token) {
    return res.status(401).json({ message: "Not authorized - no token" });
  }

  try {
    const decoded = jwt.verify(token, "abcdef");
    console.log("check", decoded);
    const user = await User.findById(decoded.id);
    
    if (!user) {
        console.log("checfffk");
      throw new Error("User not found");
    }

    res.status(200).json({ message: "User logged in successfully", user: user });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Not authorized - token verification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running successfully at ${PORT}`);
});
