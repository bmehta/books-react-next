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
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import fire from "../config/fire-config";
import { useRouter } from 'next/router';


const Book = (props): JSX.Element => {
    const [ toastMessage, setToastMessage ] = useState('');
    const [ open, setOpen ] = useState(false);

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

        setToastMessage('Added');
        setOpen(true);
    };

    const handleDelete = async () => {
        console.log(JSON.stringify(book)); //TODO: remove this

        await fire.firestore()
            .collection('books')
            .doc(book.id)
            .delete();

        setToastMessage('Deleted');
        setOpen(true);
    };

    const handlePreview = () => {
        console.log(JSON.stringify(book)); //TODO: remove this
        window.open(book.previewLink, '_blank');
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <React.Fragment>
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
                            <IconButton aria-label="preview" onClick={handlePreview}>
                                <PreviewIcon></PreviewIcon>
                            </IconButton>
                        }
                        { showAddAction &&
                            <IconButton aria-label="add" onClick={handleAdd}>
                                <AddIcon></AddIcon>
                            </IconButton>
                        }
                        { showDeleteAction &&
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                        }
                    </Box>
                </Box>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={toastMessage}
                action={action}
            />
        </React.Fragment>
    );
};

export default Book;
