import { ipcRenderer } from "electron";

export default class userServices {
  async select() {
    return await ipcRenderer.invoke("SELECT", "user");
  }

  create() {}
}
