import React, { useState } from 'react';
import fire from '../../components/Fire';
import Link from 'next/link';
import BookList from '../../components/BookList';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Search = () => {
    const [ init, setInit ] = useState(true);

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);
    fire().auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        });

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        console.log('--searchTerm--');
        console.log(searchTerm);

        fire().firestore()
            .collection('books')
            .where("title", "==", searchTerm )
            .onSnapshot(snap => {
                const books = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setSearchResults(books)
                setInit(false);
            });
    };
    return (
        <div>
            {loggedIn ?
                <React.Fragment>
                    <Typography variant="h4" component="div">Search Suggestions</Typography>
                    <Link href="/">
                        <Button variant="contained">Back to Suggestions</Button>
                    </Link>
                    <div style={{marginTop: "20px", marginBottom: "20px"}}>
                        <TextField fullWidth id="filled-search" label="Start typing" type="search" variant="outlined" onBlur={handleSearch}/>
                    </div>
                    {searchResults.length === 0 && !init ?
                        <Typography variant="subtitle2" component="div">No results found</Typography>
                        :
                        <BookList books={searchResults}/>
                    }
                </React.Fragment>
                :
                <Link href="../">Please login or register</Link>
            }

        </div>
    )
};
export default Search;
