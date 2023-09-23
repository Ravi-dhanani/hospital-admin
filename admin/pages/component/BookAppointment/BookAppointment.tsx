import ApiServices from "@/pages/services/Apiservices";
import IAppointment from "@/pages/types/bookAppointment";
import { Button, Typography } from "@mui/material";
import React from "react";
import AddUpdateAppointment from "./AddUpdateAppointment";
import LstAppointment from "./LstAppointment";

export default function BookAppointment() {
  const [open, setOpen] = React.useState(false);
  const [lstAppointment, setLstAppointment] = React.useState<IAppointment[]>();
  const getLstAppointment = async () => {
    try {
      const lstAppointmentData = await ApiServices.getLstAppointment();
      setLstAppointment(lstAppointmentData);
    } catch (ex: any) {
      console.log(ex);
    }
  };
  React.useEffect(() => {
    getLstAppointment();
  }, []);
  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" gutterBottom>
            Book Appointment
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
              Add Appointment
            </Button>
          </div>
          <div>
            <LstAppointment lstAppointment={lstAppointment} />
          </div>
        </div>
        {open ? <AddUpdateAppointment open={open} setOpen={setOpen} /> : null}
      </div>
    </div>
  );
}
