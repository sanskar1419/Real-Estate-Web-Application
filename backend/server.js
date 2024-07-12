import connectingToMongoose from "./config/mongooseConnection.js";
import app from "./index.js";

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is listening to Port :: ${PORT}`);
  connectingToMongoose();
});
