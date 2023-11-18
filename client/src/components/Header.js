import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';


const Header = () => {
    //global state
    let isLogin = useSelector(state => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //state
    const [value, setValue] = useState();
    //logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success("Logout Successfully");
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AppBar position='sticky' sx={{ background: '#0C134F' }}>
                <Toolbar>
                    <Typography variant='h4' sx={{
                        color: '#D4ADFC'
                    }}>
                        Word Weave
                    </Typography>
                    {isLogin && (
                        <Box display={'flex'} marginLeft="auto" marginRight="auto">
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                                <Tab label="Blogs" sx={{
                                    color: '#D4ADFC'
                                }} LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" sx={{
                                    color: '#D4ADFC'
                                }} LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blogs" sx={{
                                    color: '#D4ADFC'
                                }} LinkComponent={Link} to="/create-blog" />
                            </Tabs>
                        </Box>
                    )}
                    <Box display={'flex'} marginLeft="auto">
                        {!isLogin && (<>
                            <Button sx={{ margin: 1, color: '#D4ADFC' }} LinkComponent={Link} to="/login">Login</Button>
                            <Button sx={{ margin: 1, color: '#D4ADFC' }} LinkComponent={Link} to="/register" >Register</Button>
                        </>)}
                        {isLogin && (
                            <Button onClick={handleLogout} sx={{ margin: 1, color: '#D4ADFC' }}>Logout</Button>
                        )}

                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header