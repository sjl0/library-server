const bookRoutes = (app, fs) => {
  const booksPath = "./data/books.json";

  app.get("/request/", (req, res) => {
    fs.readFile(booksPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = bookRoutes;
