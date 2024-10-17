const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();


const handleError = require("./middleware/error");
const notFound = require("./middleware/not-found");



const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const menuRouter = require("./routes/menu");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const commentRouter = require("./routes/comment");
const manageRouter = require("./routes/admin-manage");
const settingRouter = require("./routes/admin-setting");
const reportRouter = require("./routes/admin-report");
const paymentRouter = require("./routes/payment");


app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(process.env.STATIC_DIR));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/comment", commentRouter);

app.use("/admin/manage", manageRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/admin/report", reportRouter);
app.use("/admin/setting", settingRouter);

app.use("/payment", paymentRouter);





app.use(handleError);
app.use('*', notFound);

app.listen(3000, () => console.log("Listening on port 3000"));