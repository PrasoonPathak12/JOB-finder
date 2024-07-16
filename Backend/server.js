const app = require('./app');
const cloudinary = require('cloudinary');

// cloudinary setup
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});