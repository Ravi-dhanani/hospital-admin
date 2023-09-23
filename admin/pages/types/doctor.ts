import IDepartment from "./department";

export default interface ISpecialty {
  Name: string;
}
export default interface IDoctor {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Image: string;
  Status: string;
  Specialty: IDepartment[];
}
