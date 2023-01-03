import { ipcRenderer, safeStorage } from "electron";
var CryptoJS = require("crypto-js");
const table = "user";

export default class userServices {
  async select(columns) {
    return await ipcRenderer.invoke("SELECT", table, columns);
  }
  async update(data) {
    await ipcRenderer.invoke("UPDATE", table, data);
  }
  async Upsert(data) {
    console.log(process.env);

    var ciphertext = CryptoJS.AES.encrypt(
      data.password,
      "U2FsdGVkX19MzYlbkzFaByEFs+lX30sw70TkfbFwdMU="
    ).toString();
    console.log(ciphertext);
    data.password = ciphertext;
    return await ipcRenderer.invoke("UPSERT", table, data);
  }
  async delete(data) {
    await ipcRenderer.invoke("DELETE", table, data);
  }
}
