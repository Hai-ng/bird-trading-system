import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CommonUtility } from "../../utilities/utilities";
import { ILoginPageProps, ILoginPageState } from './ILoginPage';
import CoreServices from '../../services/data.services';
import { HeaderTemplate } from '../CommonComponents/Header';


export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  private service = new CoreServices();
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render(): React.ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <HeaderTemplate activeTab={0} ></HeaderTemplate>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Địa chỉ Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(args) => {
                  this.setState({
                    email: args.target.value
                  })
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(args) => {
                  this.setState({
                    password: args.target.value
                  })
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lưu tài khoản"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => { this.onLogin() }}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <a href='/register'>
                    Chưa có tài khoản? Đăng ký
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  private onLogin(): void {
    let username = this.state.email;
    let pw = this.state.password;

    this.service.onLogin(username, pw).then((value: any) => {
      let token: string = value.data.token;
      let userInfo = this.service.getUserInfor(token);
      this.service.getUserInfoById(userInfo.id as string, token).then(res => {
        if (res.status) {
          let rawData = res.data?.data?.data;
          userInfo.phoneNumber = rawData['phoneNumber'];
          userInfo.email = rawData['email'];
          userInfo.address = rawData['address'] ?? '';
          userInfo.balance = rawData['balance'] ?? 0;
        }
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        if (userInfo.role === 'admin') {
          CommonUtility.redirectTo('/admin');
          return;
        }
        CommonUtility.redirectTo('/home');
      });
    }).catch((error: any) => {
      this.props.openMessage('error', 'Tài khoản hoặc mật khẩu không đúng', 4,)
    })
  }
}

const theme = createTheme();
