import ApiServices from "@/pages/services/Apiservices";
import IAppointment from "@/pages/types/bookAppointment";
import ICompany from "@/pages/types/company";
import IDoctor from "@/pages/types/doctor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import AddUpdateAppointment from "./AddUpdateAppointment";

interface ILstDoctorsProps {
  lstAppointment?: any[];
}

export default function LstAppointment(props: ILstDoctorsProps) {
  const { lstAppointment } = props;
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [objAppointment, setObjAppointment] = React.useState<IAppointment>();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>First Name</TableCell>
              <TableCell style={{ color: "white" }}>Last Name</TableCell>
              <TableCell style={{ color: "white" }}>Phone</TableCell>
              {/* <TableCell style={{ color: "white" }}>Department</TableCell> */}
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lstAppointment &&
              lstAppointment.map((item: IAppointment) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.FirstName}
                  </TableCell>
                  <TableCell>{item.LastName}</TableCell>
                  <TableCell>{item.Phone}</TableCell>
                  {/* <TableCell>{item.Department}</TableCell> */}
                  <TableCell>
                    {item.Status === "ACTIVE" ? (
                      <Chip
                        label="ACTIVE"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                        }}
                      />
                    ) : (
                      <Chip
                        label="INACTIVE"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                      />
                    )}
                  </TableCell>
                  {/* <TableCell>{item.Specialty}</TableCell> */}

                  <TableCell>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setIsEdit(true);
                          setObjAppointment(item);
                        }}
                      >
                        <EditIcon sx={{ cursor: "pointer", color: "black" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            const data = await ApiServices.deleteDoctor(
                              item._id
                            );
                            window.location.reload();
                            if (result.isConfirmed) {
                              Swal.fire(
                                "Deleted!",
                                `${data.message}`,
                                "success"
                              );
                            }
                          });
                        }}
                      >
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: "black" }}
                        />
                      </IconButton>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {open && (
          <AddUpdateAppointment
            open={open}
            setOpen={setOpen}
            objAppointment={objAppointment}
            isEdit={isEdit}
          />
        )}
      </TableContainer>
    </div>
  );
}
