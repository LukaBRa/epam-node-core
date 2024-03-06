const http = require('http');
const routes = require("./routes/routes");

const PORT = 8000;

const server = http.createServer((req, res) => {

    const pathName = req.url;

    if(pathName.startsWith("/api")){
        routes(req, res);
    } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Route not found." }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});