System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  map: {
    "codemirror": "npm:codemirror@5.14.2",
    "mobx": "npm:mobx@2.1.7",
    "react": "npm:react@15.0.2",
    "react-codemirror": "npm:react-codemirror@0.2.6",
    "react-dom": "npm:react-dom@15.0.2",
  },
});

System.import("./main");
