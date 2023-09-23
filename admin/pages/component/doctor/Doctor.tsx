import DataTable from "@/pages/common/DataTable";
import ApiServices from "@/pages/services/Apiservices";
import IDoctor from "@/pages/types/doctor";
import { Button, Chip, Typography } from "@mui/material";
import React from "react";
import AddUpdateDoctor from "./AddUpdateDoctor";
import LstDoctor from "./LstDoctor";
enum STATUS {
  "ACTIVE",
  "INACTIVE",
}
export default function Doctor() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [lstDoctors, setLstDoctors] = React.useState<IDoctor[]>();
  const getLstDoctors = async () => {
    try {
      const lstDoctors = await ApiServices.getLstDoctors();
      setLstDoctors(lstDoctors);
    } catch (ex: any) {
      console.log(ex);
    }
  };
  React.useEffect(() => {
    getLstDoctors();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" gutterBottom>
          Doctor
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
            Add Doctor
          </Button>
        </div>
        <div>
          <LstDoctor lstDoctors={lstDoctors} />
        </div>
      </div>
      {open || isEdit ? (
        <AddUpdateDoctor open={open} setOpen={setOpen} />
      ) : null}
    </div>
  );
}
