import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MainCard from "./MainCard";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const adminLogin = localStorage.getItem("token");
    if (!adminLogin) router.push("/login");
  }, [router]);
  return (
    <div>
      <Grid container spacing={2}>
        {/* {[1, 1, 1, 1].map((item) => (
          <Grid item xs={3}>
            <MainCard />
          </Grid>
        ))} */}
        11221
      </Grid>
    </div>
  );
}
