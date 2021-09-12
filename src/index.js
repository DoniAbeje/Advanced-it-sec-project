const http = require("http");

const server = http.createServer((req, res) => {});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));
