const express = require('express');
const app = express();
const PORT = 9000;
const path = require('path');
const MongoDB = require('mongoose');
const Cors = require('cors');
const cookieParser = require('cookie-parser')
const { localdb, cloudDb } = require('./variables');
const postRouter = require('./Routers/postRouter');
const getRouter = require('./Routers/getRouter');
const updateRouter = require('./Routers/updateRouter');
const deleteRouter = require('./Routers/deleteRouter');


app.use(cookieParser())
app.use(Cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/')))
app.use('/api/post', postRouter);
app.use('/api/get', getRouter);
app.use('/api/put', updateRouter);
app.use('/api/delete', deleteRouter);

app.get('/', (req, res) => {
    res.send(`
    <body style="margin: 0;padding: 0">
    <div style="height:100vh;display:flex;justify-content:center;align-items:center;flex-direction:column" >
    <h1>Welcome To The Avon Server</h1>
    </div>
    </body>
    `);
})


MongoDB.connect(cloudDb, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log("Mongo DB Not Connected ! SomeThing Went Wrong");
    else return console.log("Mongo Db Connected Successfully");
})


app.listen(PORT, (err) => {
    if (err) return console.log('Server Problem! Check Your Server.');
    else return console.log(`Server Started at : ${PORT}`);
})
