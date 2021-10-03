import React, {useState} from 'react';
import {Button, Grid, Link, Paper, TextField, Typography} from '@mui/material';
import API from "../clients/BackendClient";
import Logo from "../media/spacebook.png";
import {connect} from "react-redux";
import {addAlert} from "../Store/alerts/alertReducer.actions";
import {logInUser} from "../Store/auth/authReducer.actions";
import jwtDecode from "jwt-decode";

const Login = ({logInUser, addAlert}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const paperStyle = {padding: 20, height: '55vh', width: 280, margin: "20px auto"}
    const btnstyle = {margin: '8px 0'}

    const handleLogin = () => {
        if (email && password) {
            const user = {email, password};
            API.post('/auth/login', user).then((res) => {
                if (res.status === 201 && res.data.success) {
                    if(res.data.token){
                        const data = jwtDecode(res.data.token);
                        console.log(res.data.token);
                        logInUser({email: data.email, username: data.username, firstName: data.firstName, lastName: data.lastName, userId: data.user_id, refreshToken: data.refreshToken, jwtToken: res.data.token})
                        addAlert({alertType: "success", alertMessage: res.data.success})
                    }else{
                        addAlert({alertType: "error", alertMessage: res.data.success ? res.data.success : res.data.err});
                    }
                } else {
                    addAlert({alertType: "error", alertMessage: res.data.success ? res.data.success : res.data.err});
                }
            }).catch(err => {
                console.log("Something went wrong", err)
            })
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} height={'100px'} width={'200px'} style={{borderRadius: '20rem'}}/>
                    <h2>Login</h2>
                </Grid>

                <Grid>
                    <Grid>
                        <TextField label='Email' placeholder='Enter email' fullWidth required
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                        />
                    </Grid>
                    <br/>
                    <Grid>
                        <TextField align='center' label='Password' placeholder='Enter password' type='password'
                                   fullWidth required
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth
                        onClick={handleLogin}>Sign in</Button>
                <Typography> Do you have an account? {''}
                    <Link href="#">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (payload) => dispatch(addAlert(payload)),
        logInUser: (payload) => dispatch(logInUser(payload))
    };
};
export default connect(null, mapDispatchToProps)(Login);