import React, {useState} from 'react'
import {Grid, Paper, Typography, TextField, Button, Stack, FormControlLabel, Checkbox} from '@mui/material'
import API from '../clients/BackendClient'
import {addAlert} from "../Store/alerts/alertReducer.actions";
import {connect} from "react-redux";
import {useHistory} from "react-router";

const Signup = (props) => {
    const history = useHistory();
    const {addAlert} = props;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [country, setCountry] = useState(null);
    const [occupation, setOccupation] = useState(null);
    const [isContributor, setIsContributor] = useState(false);

    const handleCheckBox = (e) =>{
        setIsContributor(!isContributor);
    }

    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }

    const handleSignup = () =>{
        if(username && password && confirmPassword && email && firstName && lastName && country && occupation && password === confirmPassword ){
            const user = {username, password, email, firstName, lastName, occupation, country};
            API.post('/auth/signup', user).then((res) =>{
                if(res.status === 201 && res.data.success){
                    if(res.data.success === "User already exists with these credentials"){
                        addAlert({alertType: "error", alertMessage: res.data.success});
                    }else {
                        history.push('/login');
                        addAlert({alertType: "success", alertMessage: res.data.success});
                    }
                }else{
                    addAlert({alertType: "error", alertMessage: res.data.err});
                }
            })
        }
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <img src="media/spacebook.png" height={'100px'} width={'200px'} style={{borderRadius: '20rem'}}/>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='h6' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Grid container rowSpacing={5} columnSpacing={{md: 3 }}>
                    <Grid item md={6}>
                        <TextField fullWidth label='Username'  placeholder="Create a username"
                        value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Email' placeholder="Enter your email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='First Name' placeholder="Enter your first name"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Last Name' placeholder="Enter your last name"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Country' placeholder="Enter your country"
                                   value={country}
                                   onChange={(e) => setCountry(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Occupation' placeholder="Enter your occupation"
                                   value={occupation}
                                   onChange={(e) => setOccupation(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Password' placeholder="Enter your password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid align='center' paddingTop={'15px'}>
                    <Stack direction={"column"} spacing={1} alignItems={"center"}>
                        <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="Will you be contributing to Spacebook?"
                        />
                        <Button type='submit' variant='contained' color='primary' onClick={handleSignup}>Sign up</Button>
                    </Stack>
                </Grid>
            </Paper>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (payload) => dispatch(addAlert(payload))
    };
};
export default connect(null, mapDispatchToProps)(Signup);