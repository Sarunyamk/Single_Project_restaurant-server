const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();


const handleError = require("./middleware/error");
const notFound = require("./middleware/not-found");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const menuRouter = require("./routes/menu");
const adminRouter = require("./routes/admin");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());



app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/admin", adminRouter);



app.use(handleError);
app.use('*', notFound);

app.listen(3000, () => console.log("Listening on port 3000"));