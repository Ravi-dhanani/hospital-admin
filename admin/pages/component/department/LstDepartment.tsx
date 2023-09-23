import ApiServices from "@/pages/services/Apiservices";
import IDepartment from "@/pages/types/department";
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
import AddUpdateDepartment from "./AddUpdateDepartment";

interface ILstDepartmentProps {
  lstDepartment?: IDepartment[];
}

export default function LstDepartment(props: ILstDepartmentProps) {
  const { lstDepartment } = props;
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [ObjDepartment, setObjDepartment] = React.useState<IDepartment>();
  enum STATUS {
    "ACTIVE",
    "INACTIVE",
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Department Name</TableCell>
              <TableCell style={{ color: "white" }}>Description</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lstDepartment &&
              lstDepartment.map((item: IDepartment) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.DepartmentName}
                  </TableCell>
                  <TableCell>{item.Descriptions}</TableCell>
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
                          setObjDepartment(item);
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
                            const data = await ApiServices.deleteDepartment(
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
          <AddUpdateDepartment
            open={open}
            setOpen={setOpen}
            ObjDepartment={ObjDepartment}
            isEdit={isEdit}
          />
        )}
      </TableContainer>
    </div>
  );
}
