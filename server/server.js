const app = require("./api/app");
const port = 3000;

app.listen(port, () => {
  console.log(`Local server running on http://localhost:${port}`);
});

