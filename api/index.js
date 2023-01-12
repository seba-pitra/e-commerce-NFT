const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;
require("./src/services/PaymentService");

conn.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
