const app = require('./app');         // ← loads app.js
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;
if (!PORT) throw new Error("PORT must be defined");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
