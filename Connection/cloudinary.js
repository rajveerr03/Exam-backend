let multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dmplvqhgk",
    api_key: "867612519192659",
    api_secret: "HczpGUiojOdKf_-v62B-lwGSzDw"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "upload",
    },
})

let upload = multer({ storage: storage })
// let upload = multer({dest:"/upload"})

module.exports = { upload, cloudinary }