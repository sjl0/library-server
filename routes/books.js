const bookRoutes = (app, fs) => {
  const booksPath = "./data/books.json";
  const usersPath = "./data/users.json";

  app.get("/request/", (req, res) => {
    readFile(
      data => {
        res.status(200).send(data);
      },
      booksPath,
      true
    );
  });

  app.post("/request", (req, res) => {
    const timestamp = new Date().toLocaleString();
    readFile(
      data => {
        let hasLibraryCard = false;
        const emails = Object.keys(data).map(id => data[id].email);
        if (!emails.includes(req.body["email"])) {
          res
            .status(401)
            .send(
              '<h1 style="color:red;">User does not have a library card.</h1>'
            );
        } else {
          readFile(
            books => {
              if (!req.body["title"]) {
                res
                  .status(422)
                  .send(
                    '<h1 style="color:red;">Missing title for requested book</h1>'
                  );
              }
              const foundBooks = Object.keys(books).filter(
                bookId => books[bookId].title == req.body["title"]
              );
              if (foundBooks.length < 1) {
                res
                  .status(422)
                  .send('<h1 style="color:red;">Book not found</h1>');
              } else {
                const booksToReturn = [];
                foundBooks.forEach(foundBook => {
                  const bookToReturn = books[foundBook];
                  bookToReturn["timestamp"] = timestamp;
                  booksToReturn.push(bookToReturn);
                });
                if (foundBooks.length > 1) {
                  res.status(200).send(JSON.stringify(booksToReturn, null, 2));
                } else {
                  res
                    .status(200)
                    .send(JSON.stringify(booksToReturn[0], null, 2));
                }
              }
            },
            booksPath,
            true
          );
        }
      },
      usersPath,
      true
    );
  });

  const readFile = (
    callback,
    filePath,
    returnJson = false,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (fileData, callback, filePath, encoding = "utf8") => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        res.status(500).send(err);
      }

      callback();
    });
  };
};

module.exports = bookRoutes;
