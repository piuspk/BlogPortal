# 📝 Blog Application

## 📚 Table of Contents
- 🎯 Introduction
- ⭐ Features
- 🛠️ Tech Stack
- 🚀 Installation
- 🔧 Configuration
- 🖥️ Usage
- 📦 Components Overview
- 🔗 API Endpoints
- 🤝 Contributing
- 📜 License

## 🎯 Introduction
This is a full-stack Blog Application that allows users to create, edit, delete, and like blog posts. It also supports user authentication, commenting on posts, and viewing detailed information about each post.

# Tree Structure of the Project
```sh
project-root
├── client
│   ├── node_modules
│   ├── public
│   └── src
│       ├── assets
│       └── components
│           ├── about
│           │   └── About.jsx
│           ├── authent
│           │   ├── forgotpassword
│           │   │   ├── email.jsx
│           │   │   ├── newpassword.jsx
│           │   │   └── otpforget.jsx
│           │   └── Login.jsx
│           ├── banner
│           │   └── Banner.jsx
│           ├── contact
│           │   └── Contact.jsx
│           ├── create
│           │   ├── CreatePost.jsx
│           │   └── UpdatePost.jsx
│           ├── header
│           │   └── Header.jsx
│           ├── Home
│           │   ├── Post
│           │   │   ├── DisplaysPost.jsx
│           │   │   ├── GetPost.jsx
│           │   │   ├── bodydata.jsx
│           │   │   └── Categories.jsx
│           │   └── Home.js
│           ├── postDetails
│           │   ├── comments
│           │   │   ├── Comments.jsx
│           │   │   └── DisplayComments.jsx
│           │   └── Details.jsx
│           ├── redux
│           │   ├── actions
│           │   │   └── userActions.js
│           │   ├── reducers
│           │   │   ├── index.js
│           │   │   └── userReducer.js
│           │   └── store
│           │       └── store.js
│           └── service
│               ├── api.js
│               ├── App.css
│               ├── App.js
│               ├── App.test.js
│               ├── index.css
│               ├── index.js
│               ├── loading.jsx
│               ├── logo.svg
│               ├── reportWebVitals.js
│               └── setupTests.js
├── server
│   ├── controllers
│   │   ├── comments.controller.js
│   │   ├── image.controller.js
│   │   ├── posts.controller.js
│   │   └── user.controller.js
│   ├── db
│   │   ├── db.js
│   │   └── jwt.config.js
│   ├── model
│   │   ├── comment.model.js
│   │   ├── posts.model.js
│   │   ├── user.model.js
│   │   └── userOtp.model.js
│   ├── node_modules
│   ├── routes
│   │   ├── comments.routes.js
│   │   ├── image.routes.js
│   │   ├── posts.routes.js
│   │   └── user.routes.js
│   └── utils
│       └── upload.utils.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js  
```
## ⭐ Features
- **User Authentication:** Sign up, log in, and log out.
- **CRUD Operations:** Create, read, update, and delete blog posts.
- **Interactions:** Like and unlike posts. View a list of users who liked a post. Comment on posts.
- **Responsive Design:** Adapts to different screen sizes.

## 🛠️ Tech Stack
- **Frontend:** React, Redux, React Router, Material-UI, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Other Tools:** React Toastify for notifications, Styled Components for styling

## 🚀 Installation
To get a local copy up and running, follow these simple steps:

1. Clone the repository
   ```sh
   git clone https://github.com/piuspk/BlogPortal.git

Navigate to the project directory
cd blog-app

Install dependencies for both client and server
npm install
cd client
npm install

## 🔧 Configuration
Create a .env file in the root directory and add the following:

BASE_URL=http://localhost:8000

Create a .env file in the client directory and add the following:

REACT_APP_BASE_URL=http://localhost:3000

## 🖥️ Usage
Start the server

npm run server

Start the client

cd client
npm start

The application should now be running on http://localhost:3000.

📦 Components Overview
Details Component
This component displays the detailed view of a blog post, including the post’s title, author, description, likes, and comments. Users can like/unlike the post and view a list of users who liked it.

File: src/components/postDetails/Details.jsx

## Key Elements
State Management: Uses useState and useEffect for managing component state and side effects.
Styled Components: Uses Material-UI and styled components for styling.
API Integration: Uses Axios to fetch and update data from the backend.
Key Functions
**fetchData**: Fetches post details from the server.
**deleteBlog**: Deletes the post.
**toggleLike**: Toggles the like status of the post.
**handleLikeButtonClick**: Handles the click event for displaying the list of users who liked the post.
**handleClose**: Closes the dropdown menu.
Implementation Example
JavaScript
```sh
const toggleLike = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/toggleLike/${id}`, {}, {
      withCredentials: true,
    });
    setLikes(response.data.likes);
    setLiked(!liked);
    setLikedBy(response.data.likedBy || []);
    
    const userDetailsResponse = await axios.post(`${BASE_URL}/getUserDetails`, {
      userIds: response.data.likedBy,
    });
    const usernames = userDetailsResponse.data.map(user => user.username);
    setLikedByUsernames(usernames);
  } catch (error) {
    console.error("Error toggling like:", error);
    toast.error("Error toggling like");
  }
};

```

## 🔗 API Endpoints
###User Routes
**POST /signup**: Create a new user.
**POST /login**: Authenticate a user.
**GET /logout**: Log out the user.
###Post Routes
**GET /getPostsById/:id**: Get post by ID.
**POST /createPost**: Create a new post.
**PUT /updatePost/:id**: Update a post.
**DELETE /deletePost/:id**: Delete a post.
**POST /posts/toggleLike/:id**: Toggle like for a post.


## Additional Routes
**POST /getUserDetails:** Get details of users by IDs.

### sendOtp
app.post("/user/sendotppassword", userController.sendotpforforetpassword);
This route is used to send an OTP (One-Time Password) for password recovery. When a POST request is made to this endpoint, the sendotpforforetpassword function in the userController is called.

### Verify OTP
app.post("/user/otpverify", userController.otpverify);
This route is used to verify the OTP sent to the user. The otpverify function in the userController handles the verification process.

### Update Password
app.post("/user/newpassword", userController.changeinfo);
This route is used to update the user’s password after successful OTP verification. The changeinfo function in the userController handles the password update.
## Image Routes
### Upload Image

app.post("/image/upload", upload.single('file'), imageController.uploadimage);
This route is used to upload an image file. The uploadimage function in the imageController handles the image upload process. The upload.single('file') middleware is used to handle the file data in the request.
### Retrieve Image


app.get("/image/:filename", imageController.getImage);
This route is used to retrieve an uploaded image by its filename. The getImage function in the imageController handles the image retrieval process.
Multer and GridFsStorage
Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, it’s used for image uploads.

GridFsStorage is a multer storage engine for MongoDB GridFS. It’s used to store uploaded files directly in MongoDB.

JavaScript
```sh
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/ragnar_Blog',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({ storage });
module.exports = upload;
```
The storage object is a new instance of GridFsStorage that’s configured to connect to a MongoDB database and store files in a collection named ‘photos’. The file function determines the metadata for the stored files.

The upload middleware is created by calling multer with the storage configuration. This middleware can be used to handle incoming file data in HTTP requests.
