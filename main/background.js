import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();
app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});
// this is where to put the db in roaming folder
// C:\Users\Polaius\AppData\Roaming\pmi-pos
const path = require("path");
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(app.getPath("userData"), "./dev.db"),
    flags: ["OPEN_URI", "OPEN_SHAREDCACHE"],
  },
});

ipcMain.handle("SELECT", async (event, table) => {
  const result = await knex.select("*").from(table);
  return result;
});

ipcMain.handle("CREATE", async (event, table, data) => {
  const result = await knex.insert(data).into(table);
  return result;
});
// ipcMain.handle("executeQuery", async (event, args) => {
//   // let result = knex.select("*").from("User");
//   const path = require("path");
//   console.log(path.join(__dirname, "dev.db"));
//   result.then(function (rows) {
//     console.log(rows);

//     // mainWindow.webContents.send("resultSent", rows);
//   });
// });

app.on("window-all-closed", () => {
  app.quit();
});
