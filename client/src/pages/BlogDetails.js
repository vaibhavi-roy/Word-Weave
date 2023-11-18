import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    // get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
            console.log(data);
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogDetail();
    }, [id]);

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
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success("Blog Updated");
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(blog);
    return (
        <v>
            <form onSubmit={handleSubmit} >
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
                        <u><i>Update A Post</i></u>
                    </Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", }}
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
                            },
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
                        UPDATE
                    </Button>
                </Box>
            </form>
        </v>
    );
};

export default BlogDetails;