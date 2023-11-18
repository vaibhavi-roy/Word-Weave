import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, ThemeProvider } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate()
    //state
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    //handle input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //form handle,save user details
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username: inputs.name, email: inputs.email, password: inputs.password }

        try {
            const { data } = await axios.post(
                "/api/v1/user/register", {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                toast.success('User Registered Successfully');
                navigate("/login");
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
                        <u>Register</u></Typography>
                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        placeholder='Name'
                        value={inputs.name}
                        onChange={handleChange}
                        name='name'
                        margin='normal'
                        type={"text"}
                        required
                    />
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
                                color: "#D4ADFC",
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
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: 5, marginTop: 3, background: "#0C134F" }} variant="contained" color="secondary"><i>Already Registered ? Please Login</i></Button>
                </Box>
            </form>
        </>
    );
}

export default Register