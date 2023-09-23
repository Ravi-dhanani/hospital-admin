import ApiServices from "@/pages/services/Apiservices";
import IDepartment from "@/pages/types/department";
import IDoctor from "@/pages/types/doctor";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";

const schema = yup
  .object({
    DepartmentName: yup.string().required(),
    Descriptions: yup.string().required(),
    Status: yup.string().required(),
  })
  .required();

interface IAddUpdateDoctorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ObjDepartment?: IDepartment;
  isEdit?: boolean;
}

const STATUS = ["ACTIVE", "INACTIVE"];
export default function AddUpdateDepartment(props: IAddUpdateDoctorProps) {
  const { open, setOpen, ObjDepartment, isEdit } = props;
  const [specialty, setSpecialty] = React.useState<any>();

  const objForm = useForm<IDepartment>({
    resolver: yupResolver(schema),
    defaultValues: ObjDepartment,
  });

  const onSubmit = async (data: IDepartment) => {
    try {
      if (isEdit) {
        const res = await ApiServices.updateDepartment(
          data,
          ObjDepartment?._id
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
        setOpen(false);
      } else {
        await ApiServices.addDepartment(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Recode Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
        setOpen(false);
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
            {isEdit ? "Edit Department" : "Add Department"}
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
                  label="Department Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("DepartmentName")}
                />
                <p style={{ color: "red" }}>
                  {objForm.formState.errors.DepartmentName?.message}
                </p>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("Descriptions")}
                />
                <p style={{ color: "red" }}>
                  {objForm.formState.errors.Descriptions?.message}
                </p>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...objForm.register("Status")}
                  >
                    {STATUS.map((item: any, index: number) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
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
