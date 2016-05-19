import { ServerConfig } from "@terse/webpack";

export default new ServerConfig("src/client.js")
  .babel()
  .output("dist/server")
  .create()
;
