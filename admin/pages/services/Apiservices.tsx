import config from "../config";
import ICompany from "../types/company";
import ICompanyInsertData from "../types/company";
import IDepartment from "../types/department";
import IDoctor from "../types/doctor";
import HttpService from "./HttpService";

class ApiServices {
  static register(data: any) {
    return HttpService.post(`${config.API_URL}/admin/register`, data);
  }

  static login(data: any) {
    return HttpService.post(`${config.API_URL}/admin/login`, data);
  }

  static async getLstAppointment() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getAppointment`,
      localStorage.token
    );
    return res.data;
  }

  static async getEmployee(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/getEmployee/${_id}`,
      localStorage.token
    );
    return res.data;
  }
  static async deleteEmployee(_id: string) {
    let res = await HttpService.post(
      `${config.API_URL}/deleteEmployee/${_id}`,
      localStorage.token
    );
    return res.data;
  }
  static addAppointMent(data: any) {
    return HttpService.post(
      `${config.API_URL}/api/bookAppointment`,
      data,
      localStorage.token
    );
  }

  static async getLstCompany() {
    let res = await HttpService.get(
      `${config.API_URL}/getCompany`,
      localStorage.token
    );
    return res.data;
  }

  static addCompany(data: ICompany) {
    console.log(data, "data");
    return HttpService.post(
      `${config.API_URL}/addCompany`,
      data,
      localStorage.token
    );
  }
  static async updateCompany(data: ICompany, _id: any) {
    console.log(data, _id);
    let res = await HttpService.put(
      `${config.API_URL}/updateCompany/${_id}`,
      data,
      localStorage.token
    );
    return res.data;
  }
  static async deleteCompany(_id: string) {
    let res = await HttpService.post(
      `${config.API_URL}/deleteCompany/${_id}`,
      localStorage.token
    );
    return res.data;
  }

  static async getLstDoctors() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getDoctors`,
      localStorage.token
    );
    return res.data;
  }

  static async addDoctor(data: IDoctor) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addDoctor`,
      data,
      localStorage.token
    );
    return res.data;
  }

  static async updateDoctor(data: IDoctor, _id: any) {
    console.log(data, _id);
    let res = await HttpService.put(
      `${config.API_URL}/api/updateDoctor/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async deleteDoctor(_id: string) {
    let res = await HttpService.post(
      `${config.API_URL}/api/deleteDoctor/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getLstDepartment() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getDepartment`,
      localStorage.token
    );
    return res.data;
  }

  static async addDepartment(data: IDepartment) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addDepartment`,
      data,
      localStorage.token
    );
    return res.data;
  }

  static async updateDepartment(data: IDepartment, _id: any) {
    console.log(data, _id);
    let res = await HttpService.put(
      `${config.API_URL}/api/updateDepartment/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async deleteDepartment(_id: string) {
    let res = await HttpService.post(
      `${config.API_URL}/api/deleteDepartment/${_id}`,
      localStorage.token
    );
    return res;
  }
}

export default ApiServices;
