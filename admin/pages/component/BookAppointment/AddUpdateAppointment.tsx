import IDepartment from "@/pages/types/department";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DoctorSpecialtyAutoComplete from "../autocomplete/DoctorSpecialtyAutoComplete";
import DepartmentAutoComplete from "./DepartmentaAutoComplete";
import IAppointment from "@/pages/types/bookAppointment";
import ApiServices from "@/pages/services/Apiservices";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";

interface IAddUpdateBookAppointmentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objAppointment?: IAppointment;
  isEdit?: boolean;
}

const schema = yup
  .object({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    Phone: yup.string().required(),
    // Slot: yup.string().required(),
    Status: yup.string().required(),
  })
  .required();
const STATUS = ["ACTIVE", "INACTIVE"];

export default function AddUpdateAppointment(
  props: IAddUpdateBookAppointmentProps
) {
  const { open, setOpen, isEdit, objAppointment } = props;
  const [selectDepartment, setSelectDepartment] = React.useState<any>(null);

  const objForm = useForm<IAppointment>({
    resolver: yupResolver(schema),
    defaultValues: objAppointment,
  });
  if (selectDepartment?.length) {
    objForm.setValue("Department", selectDepartment);
  }

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = { ...data, Slot: "10", Department: selectDepartment };
    console.log(result);
    try {
      if (isEdit) {
        const res = await ApiServices.updateDoctor(result, objAppointment?._id);
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
        await ApiServices.addAppointMent(result);
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
            {isEdit ? "Edit Appointment" : "Add Appointment"}
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
                  label="Phone"
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
                <DepartmentAutoComplete
                  setSelectDepartment={setSelectDepartment}
                  selectDepartment={selectDepartment}
                  objForm={objForm}
                  objAppointment={objAppointment}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Slot
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={age}
                    label="Slot"
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    <AddIcon />
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...objForm.register("Status")}
                    defaultValue={
                      objAppointment?.Status ? objAppointment?.Status : ""
                    }
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
