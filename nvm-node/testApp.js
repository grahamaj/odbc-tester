const odbc = require("odbc");
const interval = setInterval(() => {
  odbc.connect({ connectionString: "Dsn=Mydsn" })
    .then(() => console.log("Hooray!"))
    .then(() => clearInterval(interval))
    .catch(() => console.log("Boo!"));
}, 10000);
