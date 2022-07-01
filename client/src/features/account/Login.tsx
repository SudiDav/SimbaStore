import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Paper} from "@mui/material";
import {Link} from "react-router-dom";
import agent from "../../app/api/agent";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm();

  async function submitForm(data: FieldValues) {
    await agent.Account.login(data);
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={Paper}
        maxWidth='sm'
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login To SimbaStore
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{mt: 1}}
          >
            <TextField
              margin='normal'
              fullWidth
              label='username'
              autoFocus
              {...register("username")}
            />

            <TextField
              margin='normal'
              fullWidth
              label='Password'
              type='password'
              {...register("password")}
            />
            <LoadingButton
              loading={isSubmitting}
              type='submit'
              fullWidth
              variant='contained'
              sx={{mt: 3, mb: 2}}
            >
              Login
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
