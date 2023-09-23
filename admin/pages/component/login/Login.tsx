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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApiServices from "@/pages/services/Apiservices";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type loginData = yup.InferType<typeof schema>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: loginData) => {
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
      router.push("/");
    } catch (errors: any) {
      console.log(errors);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
              <p style={{ color: "red" }}>{errors.email?.message}</p>
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
              <p style={{ color: "red" }}>{errors.password?.message}</p>
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
      </Container>
    </div>
  );
}
