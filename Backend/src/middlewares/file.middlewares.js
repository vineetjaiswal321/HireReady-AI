import multer from "multer"

const upload=multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize:4*1024*1024 //3mb
    }
})

export default upload