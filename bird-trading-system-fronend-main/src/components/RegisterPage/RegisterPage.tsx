import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { IRegisterPageProps, IRegisterPageState } from './IRegisterPage';
import CoreServices from '../../services/data.services';
import { CommonUtility } from '../../utilities/utilities';

export class RegisterPage extends React.Component<IRegisterPageProps, IRegisterPageState> {
    public coreService = new CoreServices();
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            username: '',
            passwordConfirm: '',
            address: '',
        }
    }

    render(): React.ReactNode {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
        };

        return (
            <ThemeProvider theme={theme}>
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
                            Đăng Ký
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Tên"
                                        autoFocus
                                        onChange={(args) => {
                                            this.setState({
                                                firstName: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Họ"
                                        onChange={(args) => {
                                            this.setState({
                                                lastName: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Tên tài khoản"
                                        onChange={(args) => {
                                            this.setState({
                                                username: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        onChange={(args) => {
                                            this.setState({
                                                password: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Xác nhận mật khẩu"
                                        type="password"
                                        id="password-confirm"
                                        onChange={(args) => {
                                            this.setState({
                                                passwordConfirm: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ Email"
                                        id="email"
                                        type='email'
                                        onChange={(args) => {
                                            this.setState({
                                                email: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Điện thoại"
                                        id="phoneNo"
                                        onChange={(args) => {
                                            this.setState({
                                                phoneNumber: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        id="address"
                                        type='address'
                                        onChange={(args) => {
                                            this.setState({
                                                address: args.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                id="btn"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    let valid = this.onValidateForm();
                                    if (!valid) {

                                        // this.props.openMessage('warning', 'Thông tin ... không hợp lệ', 2);
                                        return;
                                    }
                                    this.onRegisterAccount();
                                }}
                            >
                                Đăng Ký
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to='/login'>
                                        Bạn đã có tài khoản? Đăng nhập
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    private onValidateForm(): boolean {
        let username = this.state.username;
        let firstname = this.state.firstName;
        let lastname = this.state.lastName;
        let pw = this.state.password;
        let pwCf = this.state.passwordConfirm;

        // let btn = document.getElementById('btn') as HTMLButtonElement | null;
        // let usernameId = document.getElementById('username') as HTMLButtonElement | null;

        if (username == "" || firstname == "" || lastname == "" || pw == "" || pwCf == "") {
            this.props.openMessage('warning', 'Bạn cần nhập đầy đủ thông tin có dấu (*)', 3);
            console.log("chua nhap day du thong tin");
            return false;
        }
        if (pw != pwCf) {
            this.props.openMessage('warning', 'Xác nhận mật khẩu không trùng khớp!', 3);
            console.log("mat khau ko trung khop");
            return false;
        }
        //to do
        return true;
    }

    private onRegisterAccount(): void {
        let accountInfo = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "phoneNumber": this.state.phoneNumber
        }
        let key = `register_${new Date().getTime()}`;
        this.props.openMessage('loading', 'Đang tạo tài khoản...', undefined, key);
        this.coreService.registerAccount(accountInfo).then((res: any) => {
            this.props.destroyMessage(key);
            this.props.openMessage('success', 'Tạo tài khoản thành công!');
            setTimeout(() => {
                CommonUtility.redirectTo("/login");
            }, 1500)
        }).catch((err: any) => {
            this.props.destroyMessage(key);
            this.props.openMessage('error', 'Tạo tài khoản thất bại!');
        })
    }
}

const theme = createTheme();