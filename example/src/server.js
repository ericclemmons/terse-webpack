import express from "express";
import { middleware as webpack } from "@terse/webpack";

import client from "../webpack.config.client.babel.js";

express()
  .use(webpack(client))
  .use(express.static("dist/client")
  .listen(3000, (err) => {
    if (err) {
      throw err;
    }

    console.info("🌍 Listening at http://localhost:3000/");
  })
;
