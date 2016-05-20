import { ClientConfig } from "@terse/webpack";

export default new ClientConfig("src/client.js")
  .babel()
  .output("dist/client")
  .create()
;
