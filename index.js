const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const handleError = require("./middleware/error");
const notFound = require("./middleware/not-found");

const authRouter = require("./routes/auth");


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



app.use("/auth", authRouter);
// app.use("/api", memberRouter);

app.use(handleError);
app.use('*', notFound);

app.listen(8000, () => console.log("Listening on port 8000"));