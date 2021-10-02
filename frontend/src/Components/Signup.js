import React from 'react'
import {Grid, Paper, Avatar, Typography, TextField, Button, FormHelperText} from '@material-ui/core'
import {Box} from "@mui/material";
import Logo from "../media/spacebook.png";

const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <img src= {Logo} height={'100px'} width={'200px'} style={{borderRadius: '20rem'}}/>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='h6' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Grid container rowSpacing={5} columnSpacing={{md: 3 }}>
                    <Grid item md={6}>
                        <TextField fullWidth label='Username'  placeholder="Create a username" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Email' placeholder="Enter your email" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='First Name' placeholder="Enter your first name" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Last Name' placeholder="Enter your last name" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Country' placeholder="Enter your country" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Occupation' placeholder="Enter your occupation" />
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Password' placeholder="Enter your password"/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
                    </Grid>
                </Grid>
                <Grid align='center' paddingTop={'30px'}>

                    <Box textAlign={'center'}>
                        <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup;