import React from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Logo from "../media/spacebook.png";

const Login = (props) =>{

    const paperStyle={padding:20,height:'55vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#6291af'}
    const btnstyle={margin:'8px 0'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <img src= {Logo} height={'100px'} width={'200px'} style={{borderRadius: '20rem'}}/>
                    {/*<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>*/}
                    <h2>Login</h2>
                </Grid>

                <Grid>
                    <Grid>
                        <TextField label='Email' placeholder='Enter email' fullWidth required/>
                    </Grid>
                    <br/>
                    <Grid>
                        <TextField align='center' label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    </Grid>
                </Grid>
                <br/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography> Do you have an account? {''}
                    <Link href="#">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
};

export default Login;