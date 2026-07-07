const expres = require("express");
const authRouter = require("./router/auth.routes")
const postRouter = require("./router/post.routes")
const cookipersir = require("cookie-parser");
const followRouter = require("./router/follow.routes");

const app = expres();

app.use(expres.json());
app.use(cookipersir());



app.use("/api/auth",authRouter);
app.use("/api/Post",postRouter);
app.use("/api/follow", followRouter);

module.exports = app;