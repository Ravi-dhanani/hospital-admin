import IDepartment from "./department";

export default interface IAppointment {
  _id: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Department: IDepartment[];
  Slot: string;
  Status: string;
}
