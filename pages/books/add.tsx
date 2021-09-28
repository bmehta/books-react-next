import React, { useState } from 'react';
import BookList from '../../components/BookList';
import Link from 'next/link';
import fire from '../../components/Fire';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export interface IBook {
    id: string,
    previewLink: string,
    thumbnail: string,
    title: string
}

const Add = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<IBook[]>([]);

    const [loggedIn, setLoggedIn] = useState(false);
    fire().auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        });

    const handleSearch = async (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);

        if (searchTerm && searchTerm.trim() !== '') {
            const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&projection=lite&maxResults=10&key=${googleApiKey}` );
            const responseBooks = await res.json();
            const books = responseBooks.items.map((book) => {
                return  {
                    id: book.id,
                    authors: book.volumeInfo.authors,
                    previewLink: book.volumeInfo.previewLink,
                    publisher: book.volumeInfo.publisher,
                    title: book.volumeInfo.title,
                    thumbnail: book.volumeInfo.imageLinks?.smallThumbnail
                }
            });
            setBooks(books);
        }
    };
    return (
        <div>
            {loggedIn ?
                <React.Fragment>
                    <Typography variant="h4" component="div">Search for books to suggest</Typography>
                    <Link href="/">
                        <Button variant="contained">Back to Suggestions</Button>
                    </Link>
                    <div style={{marginTop: "20px", marginBottom: "20px"}}>
                        <TextField fullWidth id="filled-search" label="Start searching" type="search" variant="outlined" onChange={handleSearch}/>
                    </div>
                    <BookList books={books} showAddAction="true"/>
                </React.Fragment>
            :
                <Link href="../">Please login or register</Link>
            }
        </div>
    )
};
export default Add;
