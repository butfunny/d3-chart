const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at:${port}` );
});
