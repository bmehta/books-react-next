import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import fire from "../config/fire-config";


const Book = (props) => {
    const { book } = props;
    const { showPreviewAction = true } = props;
    const { showAddAction = false } = props;
    const { showDeleteAction = false } = props;

    const handleAdd = async () => {
        console.log(JSON.stringify(book)); //TODO: remove this

        const volumeId = book.id;
        const { authors = [], previewLink = '', publisher ='', thumbnail = '', title = '' } = book;

        await fire.firestore()
            .collection('books')
            .add({ volumeId, authors, previewLink, publisher, thumbnail, title });
    };

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151, maxHeight: 250 }}
                image={book.thumbnail}
                alt={book.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {book.authors}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        {book.publisher}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    { showPreviewAction &&
                        <IconButton aria-label="preview">
                            <PreviewIcon></PreviewIcon>
                        </IconButton>
                    }
                    { showAddAction &&
                        <IconButton aria-label="add" onClick={handleAdd}>
                            <AddIcon></AddIcon>
                        </IconButton>
                    }
                    { showDeleteAction &&
                    <IconButton aria-label="delete">
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                    }
                </Box>
            </Box>
        </Card>
    );


};

export default Book;
