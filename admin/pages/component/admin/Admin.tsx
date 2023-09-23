import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ApiServices from "@/pages/services/Apiservices";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type loginData = yup.InferType<typeof schema>;
export default function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await ApiServices.login(data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("userData", JSON.stringify(res.data));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (errors: any) {
      console.log(errors);
    }
  };
  return (
    <div>
      <Box
        sx={{
          px: 4,
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              {...register("email")}
            />
            {/* <p style={{ color: "red" }}>{froerrors.email?.message}</p> */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {/* <p style={{ color: "red" }}>{errors.password?.message}</p> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </div>
  );
}
