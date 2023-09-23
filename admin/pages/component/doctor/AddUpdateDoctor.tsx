import ApiServices from "@/pages/services/Apiservices";
import IDoctor from "@/pages/types/doctor";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import DoctorSpecialtyAutoComplete from "../autocomplete/DoctorSpecialtyAutoComplete";

var phoneValidation = /^([\s\(\)\-]*\d[\s\(\)\-]*){10}$/;
var emailValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup
  .object({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    Email: yup
      .string()
      .matches(emailValidation, "Please valied email")
      .required("A email  is required"),
    Phone: yup
      .string()
      .matches(phoneValidation, "Please valied number")
      .required("A phone number is required"),
    Status: yup.string().required(),
    Specialty: yup.array().of(yup.object().required()).required(),
  })
  .required();

interface IAddUpdateDoctorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objDoctor?: IDoctor;
  isEdit?: boolean;
}

const STATUS = ["ACTIVE", "INACTIVE"];
export default function AddUpdateDoctor(props: IAddUpdateDoctorProps) {
  const { open, setOpen, objDoctor, isEdit } = props;
  const [postImage, setPostImage] = React.useState<any>({
    myFile: "",
  });
  const [specialty, setSpecialty] = React.useState<any>(null);

  const objForm = useForm<IDoctor>({
    resolver: yupResolver(schema),
    defaultValues: objDoctor,
  });

  if (specialty?.length) {
    objForm.setValue("Specialty", specialty);
  }

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const onSubmit = async (data: any) => {
    const result = { ...data, Image: postImage.myFile, Specialty: specialty };
    console.log(result);
    try {
      if (isEdit) {
        const res = await ApiServices.updateDoctor(result, objDoctor?._id);
        Swal.fire({
          position: "center",
          icon: "success",
          // title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
        setOpen(false);
      } else {
        await ApiServices.addDoctor(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Recode Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpen(false);
        window.location.reload();
      }
    } catch (ex: any) {
      console.log(ex);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"md"}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <DialogTitle style={{ backgroundColor: "#1976d2", color: "white" }}>
            {isEdit ? "Edit Doctor" : "Add Doctor"}
          </DialogTitle>

          <DialogContent>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              marginTop={1}
            >
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("FirstName")}
                  error={objForm.formState.errors.FirstName ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.FirstName?.message}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("LastName")}
                  error={objForm.formState.errors.LastName ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.LastName?.message}
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="Email"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("Email")}
                  error={objForm.formState.errors.Email ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.Email?.message}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Phone"
                  type="number"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("Phone")}
                  error={objForm.formState.errors.Phone ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.Phone?.message}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...objForm.register("Status")}
                    defaultValue={objDoctor?.Status ? objDoctor?.Status : ""}
                    error={objForm.formState.errors.Status ? true : false}
                  >
                    {STATUS.map((item: any, index: number) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {objForm.formState.errors.Status?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <DoctorSpecialtyAutoComplete
                  specialty={specialty}
                  setSpecialty={setSpecialty}
                  objDoctor={objDoctor}
                  objForm={objForm}
                />
              </Grid>
              {/* {!isEdit && ( */}
              <Grid item xs={12}>
                <label>
                  Select Image
                  <Button>
                    <input
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </label>
              </Grid>
              {/* )} */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit" color="primary">
              {isEdit ? "Edit " : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
