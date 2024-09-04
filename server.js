
const express = require("express")

const app = express()
const port = 8080

app.use(express.static("dev/dist"))

app.listen(port, () => console.log("server has been started on port 8080"))

