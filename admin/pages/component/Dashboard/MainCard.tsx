import { Avatar, Card, Grid, Typography } from "@mui/material";
import React from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function MainCard() {
  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <Grid container spacing={2} sx={{ margin: "20px" }}>
          <Grid container item xs={12}>
            <Grid item xs={9}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "gray",
                }}
              >
                Total Page Views
              </Typography>
              <Typography
                sx={{
                  fontSize: 35,
                  fontWeight: 600,
                }}
              >
                12
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                sx={{ backgroundColor: "#1890FF", height: 50, width: 50 }}
              >
                <LocalHospitalIcon sx={{ fontSize: "40px" }} />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
