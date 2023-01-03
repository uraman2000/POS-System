import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
import createTables from "./helpers/createTables";
import insertSampleData from "./helpers/insertSampleData";

const isProd = process.env.NODE_ENV === "production";
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
app.whenReady().then(async () => {
  try {
    await createTables(knex);
  } catch (error) {}

  try {
    // insertSampleData(knex);
  } catch (error) {
    console.log(error);
  }
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

ipcMain.handle("SELECT", async (event, table, columns) => {
  try {
    const col = !columns ? "*" : columns.split(",");
    let result = await knex.select(col).from(table);
    return result;
  } catch (error) {}
});

ipcMain.handle("CREATE", async (event, table, data) => {
  try {
    await knex(table).insert(data);
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("UPSERT", async (event, table, data) => {
  try {
    const result = await knex(table).where({ id: data.id }).update(data);
    if (result === 0) {
      // No rows were updated, so insert a new record
      await knex(table).insert(data);
    }
  } catch (error) {
    return error;
  }
});

ipcMain.handle("UPDATE", async (event, table, data) => {
  try {
    await knex(table).where({ id: data.id }).update(data);
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("DELETE", async (event, table, data) => {
  try {
    await knex(table).where({ id: data.id }).del();
  } catch (error) {
    console.error(error);
  }
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
