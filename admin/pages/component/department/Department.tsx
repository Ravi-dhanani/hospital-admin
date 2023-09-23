import ApiServices from "@/pages/services/Apiservices";
import IDepartment from "@/pages/types/department";
import { Button, Typography } from "@mui/material";
import React from "react";
import AddUpdateDepartment from "./AddUpdateDepartment";
import LstDepartment from "./LstDepartment";

export default function Department() {
  const [open, setOpen] = React.useState(false);
  const [lstDepartment, setLstDepartment] = React.useState<IDepartment[]>();
  const getLstDepartment = async () => {
    try {
      const lstDepartment = await ApiServices.getLstDepartment();
      setLstDepartment(lstDepartment);
    } catch (ex: any) {
      console.log(ex);
    }
  };
  React.useEffect(() => {
    getLstDepartment();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" gutterBottom>
          Departments
        </Typography>
      </div>
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingBottom: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add DepartMent
          </Button>
        </div>
        <div>
          <LstDepartment lstDepartment={lstDepartment} />
        </div>
      </div>
      {open ? <AddUpdateDepartment open={open} setOpen={setOpen} /> : null}
    </div>
  );
}
