const fs = require("fs");

const routesHandler = (req, res) => {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
            <form action="/message" method = "POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="username"></input>
            <button type="submit">Add</button>
            </form>
            `);
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      dataChunks = [];
      req.on("data", (chunks) => {
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let comninedBuffer = Buffer.concat(dataChunks);
        let value = comninedBuffer.toString().split("=")[1];

        fs.writeFile("Values.txt", value, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (req.url == "/read") {
        fs.readFile("Values.txt", (err, data) => {
          res.end(`<h1>${data.toString()}</h1>`);
        });
      }
    }
  }
};

module.exports = routesHandler;
