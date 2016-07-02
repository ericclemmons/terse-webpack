import express from "express";
import client from "../webpack.config.client.js";

express()
  .use(webpack(client))
  .use(express.static("build/client"))
  .listen(3000, (err) => {
    if (err) {
      throw err;
    }

    console.info("🌍 Listening at http://localhost:3000/");
  })
;
