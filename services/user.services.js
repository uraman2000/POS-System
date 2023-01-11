import { ipcRenderer, safeStorage } from "electron";
var CryptoJS = require("crypto-js");

const table = "user";
const hash = (password) => {
  const hash = CryptoJS.HmacSHA256("U2FsdGVkX19MzYlbkzFaByEFs+lX30sw70TkfbFwdMU=", password);
  return CryptoJS.enc.Base64.stringify(hash);
};
export default class UserServices {
  async select(columns) {
    return await ipcRenderer.invoke("SELECT", table, columns);
  }

  async find(where) {
    return await ipcRenderer.invoke("FIND", table, where);
  }

  async login(data) {
    data.password = hash(data.password);
    const res = await ipcRenderer.invoke("FIND", table, data);
    if (res.length == 0) return { status: 404, message: "Invalid Username Or Password" };
    delete res[0].password;
    return { status: 200, data: res[0] };
  }
  async setCommision(user, data) {
    console.log(user);
    const updateEmployee = { ...user };
    const owner = await this.find({ type: "Owner" });
    delete owner[0].password;

    updateEmployee.totalIncome += (calculateNet(data) / 100) * updateEmployee.commission;
    owner[0].totalIncome += (calculateNet(data) / 100) * owner[0].commission;

    await ipcRenderer.invoke("UPDATE", table, updateEmployee);
    await ipcRenderer.invoke("UPDATE", table, owner[0]);
    return updateEmployee;
  }
  async update(data) {
    await ipcRenderer.invoke("UPDATE", table, data);
  }
  async Upsert(data) {
    data.password = hash(data.password);
    return await ipcRenderer.invoke("UPSERT", table, data);
  }
  async delete(data) {
    await ipcRenderer.invoke("DELETE", table, data);
  }
}
// cost: 90;
// id: "1232";
// name: "Gin Bilog";
// price: 120;
// qty: 1;
// quantity: 52;
// total_price: 120;
const calculateNet = (data) => {
  let totalCommision = 0;
  data.map((item) => {
    totalCommision += (item.price - item.cost) * item.qty;
  });
  return totalCommision;
};
