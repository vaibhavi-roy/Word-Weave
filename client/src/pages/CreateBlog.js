import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });
    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://word-weave-edj4.onrender.com/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success("Blog Created");
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{ backgroundColor: '#D4ADFC', }}
                    width={"40%"}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={"10px 10px 20px #ccc"}
                    display="flex"
                    flexDirection={"column"}
                    marginTop="30px"
                >
                    <Typography
                        variant="h3"
                        textAlign={"center"}
                        fontWeight="bold"
                        padding={3}
                        color="#0C134F"
                    >
                        <u><i>Create A Post</i></u>
                    </Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Title
                    </InputLabel>
                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        required
                    />
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Description
                    </InputLabel>
                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        required
                    />
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Image URL
                    </InputLabel>
                    <TextField
                        sx={{
                            "& input": {
                                color: "#5C469C",
                            }
                        }}
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        required
                    />
                    <Button type="submit" color="secondary" variant="contained" sx={{ borderRadius: 5, marginTop: 3, background: "#0C134F" }}>
                        SUBMIT
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default CreateBlog;