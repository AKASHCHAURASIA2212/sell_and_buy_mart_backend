import multer from 'multer';

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log("destination");
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        console.log("filename");
        console.log(file);
        console.log(req);
        const fname = Date.now() + "_" + file.originalname;
        cb(null, fname);
    }
});

export const uploadFile = multer({ storage: storage });

