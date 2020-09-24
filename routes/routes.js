const bookRoutes = require("./books");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send(
      '<h1 style="color:blue;">Welcome to my vast and impressive library. What knowledge do you seek today?</div>'
    );
  });

  bookRoutes(app, fs);
};

module.exports = appRouter;
