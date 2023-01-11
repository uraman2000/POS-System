import { ipcRenderer } from "electron";

export default class ProductServices {
  async select() {
    return await ipcRenderer.invoke("SELECT", "product");
  }
  async update(data) {
    await ipcRenderer.invoke("UPDATE", "product", data);
  }

  async Upsert(data) {
    await ipcRenderer.invoke("UPSERT", "product", data);
  }
  async insert(data) {
    await ipcRenderer.invoke("CREATE", "product", data);
  }
  async delete(data) {
    await ipcRenderer.invoke("DELETE", "product", data);
  }
}
