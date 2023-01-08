import { ipcRenderer } from "electron";

const table = "transactions";
export default class TransactionServices {
  async select() {
    return await ipcRenderer.invoke("SELECT", table);
  }
  async update(data) {
    await ipcRenderer.invoke("UPDATE", table, data);
  }

  async Upsert(data) {
    await ipcRenderer.invoke("UPSERT", table, data);
  }
  async insert(data) {
    await ipcRenderer.invoke("CREATE", table, data);
  }
  async delete(data) {
    await ipcRenderer.invoke("DELETE", table, data);
  }
}
