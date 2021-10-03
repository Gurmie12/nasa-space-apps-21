import React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Box, Button, ButtonGroup, Toolbar, InputBase, Avatar, Stack, Modal} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../media/spacebook.png";
import {useHistory} from "react-router";
import {addAlert} from "../Store/alerts/alertReducer.actions";
import {logoutUser} from "../Store/auth/authReducer.actions";
import {connect} from "react-redux";
import {openCreateNewPost} from "../Store/posts/postsReducer.actions";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#ffebee',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const NavBar = (props) =>{
    const {firstName, lastName, isLoggedIn, isContributor} = props.user;
    const {logoutUser, addAlert, openCreateNewPost} = props;

    const history = useHistory();

    const sendToLogin = () =>{
        history.push('/login');
    };

    const sendToSignup = () =>{
        history.push('/signup');
    };

    const getInitials = (first, last) =>{
        return first.charAt(0) + last.charAt(0);
    }

    const handleLogoutUser = () =>{
        logoutUser();
        addAlert({alertType: 'success', alertMessage: 'User Successfully logged out!'});
    }

    const handleOpenNewCreatePost = (e) =>{
        openCreateNewPost(true);
    }

    return (
        <AppBar position="static" color={'transparent'}>
            <Toolbar>
                <Box marginTop={"5px"} marginBottom={"5px"} style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <img src= {Logo} height={'62px'} width={'124px'} style={{borderRadius: '2rem'}}/>
                </Box>
                {isLoggedIn &&
                    <>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                        {isContributor &&
                            <ButtonGroup variant="text" color={"inherit"}>
                                <Button variant={"contained"} onClick={handleOpenNewCreatePost}>Create Console Log</Button>
                            </ButtonGroup>
                        }
                    </>
                }
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
                    {!isLoggedIn ?
                        <ButtonGroup variant="text" aria-label="text button group" color={"inherit"}>
                            <Button onClick={sendToLogin}>Login</Button>
                            <Button onClick={sendToSignup}>Signup</Button>
                        </ButtonGroup>
                        :
                        <Stack direction={"row"} spacing={2}>
                            <Button onClick={handleLogoutUser} variant={"contained"} color={"inherit"}>Logout</Button>
                            <Avatar>{getInitials(firstName, lastName)}</Avatar>
                        </Stack>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (payload) => dispatch(addAlert(payload)),
        logoutUser: (payload) => dispatch(logoutUser()),
        openCreateNewPost: (payload) => dispatch(openCreateNewPost(payload))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);