#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");

const { description, name, version } = require("../package.json");

const loadLocal = (file) => {
  try {
    return fs.readFileSync(path.join(process.cwd(), file), "utf8");
  } catch (e) {
    return false;
  }
};

const loadExample = (file) => {
  return fs.readFileSync(path.join(__dirname, "..", "example", file), "utf8");
};

const save = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { content, file } = JSON.parse(body);

    fs.writeFileSync(path.join(process.cwd(), file), content);
    res.writeHead(201);
    res.end();
  });
};

const view = (req, res) => {
  const files = [
    "src/client.js",
    "src/server.js",
    "webpack.config.babel.js",
    "webpack.config.client.babel.js",
    "webpack.config.server.babel.js",
  ].reduce((files, file) => {
    const existing = loadLocal(file);

    return Object.assign(files, {
      [file]: {
        content: existing || loadExample(file),
        exists: !!existing,
        saved: false,
      },
    });
  }, {});

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>
          Bootstrap – @terse/webpack
        </title>

        <!-- SystemJS -->
        <script src="https://jspm.io/system@0.19.js"></script>
        <script src="./config.js"></script>

        <!-- Theme -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.0.26/css/bulma.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <style>
          .section .CodeMirror { height: auto; }
        </style>
      </head>
      <body>
        <div id="app">
          <div style="width: 100%; height: 100%; position: fixed; display: flex; justify-content: center; align-items: center;">
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify({
            description,
            files,
            name,
            version,
          })};
        </script>
      </body>
    </html>
  `);
};


const server = http.createServer((req, res) => {
  const { method, url } = req;

  switch (`${method} ${url}`) {
    case "GET /":
      return view(req, res);

    case "GET /favicon.ico":
      return res.end();

    case "PUT /save":
      return save(req, res);

    default:
      try {
        return res.end(fs.readFileSync(path.join(__dirname, req.url), "utf8"));
      } catch (e) {
        res.writeHead(404);
        res.end();
        console.error(`Unhandled request: ${method} ${url}`);
        console.error(e);
      }
  }
});

server.listen(3000, () => {
  console.info(`${name} is running: http://localhost:3000/`);
});
