const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;
require("./src/services/PaymentService");
// server.listen(port, () => {
//   console.log(`listening at ${3001}`);
// });

conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
