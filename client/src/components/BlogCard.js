import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Grid } from '@mui/material';


export default function BlogCard({
    title,
    description,
    image,
    username,
    time,
    id,
    isUser
}) {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`)
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`https://word-weave-edj4.onrender.com/api/v1/blog/delete-blog/${id}`);
            if (data?.success) {
                toast.success("Blog Deleted");
                // navigate("/my-blogs");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='cards'>
            <Card sx={{
                width: '38%',
                margin: 'auto',
                mt: 2,
                padding: 2,
                boxShadow: '5px 5px 10px #ccc',
                ":hover": {
                    boxShadow: '10px 10px 20px #ccc',
                },
                backgroundColor: '#D4ADFC',
                borderRadius: 3

            }}>
                {isUser && (
                    <Box display={"flex"} >
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditIcon color="info" />
                        </IconButton>
                        <IconButton onClick={handleDelete} >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "#1D267D" }} >
                            {username}
                        </Avatar>
                    }
                    title={username}
                    subheader={time}
                />
                <CardMedia
                    component="img"
                    height="250"
                    image={image}

                />
                <CardContent>
                    <Typography variant="h6" color="#0C134F">
                        Title:{title}
                    </Typography>
                    <Typography variant="body2" color="#0C134F">
                        Description:{description}
                    </Typography>
                </CardContent>


            </Card>
        </div>
    );
}