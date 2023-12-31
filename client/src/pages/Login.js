import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    //handle input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    //form handle,save user details
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://word-weave-edj4.onrender.com/api/v1/user/login", {
                email: inputs.email,
                password: inputs.password
            });
            if (data.success) {
                //save user in local storage
                localStorage.setItem("userId", data?.user._id);
                dispatch(authActions.login());
                toast.success('User Logged In Successfully');
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{ backgroundColor: '#D4ADFC', }}
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            textTransform: "uppercase",
                            color: "#0C134F"
                        }}
                        padding={3}
                        textAlign="center">
                        <u>Login</u>
                    </Typography>

                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        color="secondary"
                        placeholder='Email'
                        value={inputs.email}
                        onChange={handleChange}
                        name='email'
                        margin='normal'
                        type={"email"}
                        required
                    />
                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        color="secondary"
                        placeholder='Password'
                        value={inputs.password}
                        onChange={handleChange}
                        name='password'
                        margin='normal'
                        type={"password"}
                        required
                    />
                    <Button
                        type="submit"
                        sx={{ borderRadius: 5, marginTop: 3, background: "#0C134F" }}
                        variant="contained"
                        color="secondary"
                    >Submit</Button>

                    <Button
                        onClick={() => navigate("/register")}
                        sx={{ borderRadius: 5, marginTop: 3, background: "#0C134F" }} variant="contained" color="secondary"><i>Not a user ? Please Register</i></Button>
                </Box>
            </form>
        </>
    );
}

export default Login