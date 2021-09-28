import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import fire from '../components/Fire';
import BookList from '../components/BookList';
import Button from '@mui/material/Button';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    fire().auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        });

    useEffect(() => {
        fire().firestore()
            .collection('books')
            .orderBy('dateCreated')
            .limitToLast(1000)
            .onSnapshot(snap => {
                const books = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBooks(books.reverse());
            });
    }, []);

    const handleLogout = () => {
        fire().auth()
            .signOut()
            .then(() => {
                setNotification('Logged out');
                setTimeout(() => {
                    setNotification('')
                }, 2000)
            });
    };
    return (
        <div>
            <Head>
                <title>Binita's book app: Made with React, Next and Firebase</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Typography variant="h3" component="div">Books! Our best friends!</Typography>
            {notification}
            {!loggedIn
                ?
                <React.Fragment>
                    <div>
                        <Link href="/users/register">
                            <Button variant="text">Register</Button>
                        </Link>
                    </div>
                    <div>
                        <Link href="/users/login">
                            <Button variant="text">Login</Button>
                        </Link>
                    </div>
                    <Typography variant="subtitle2">(Use test@test.com/test123 to log on as guest)</Typography>
                </React.Fragment>
                :
                <React.Fragment>
                    <div>
                        <Link href="/books/add">
                            <Button variant="contained">Add a Suggestion</Button>
                        </Link>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <Link href="/books/search">
                            <Button variant="contained">Search Current Suggestions</Button>
                        </Link>
                    </div>
                    <Button onClick={handleLogout} variant="text">Log out</Button>
                    <div style={{marginTop: "10px", marginBottom: "10px"}}>
                        <Typography variant="h4" component="div">Current Book Suggestions</Typography>
                    </div>
                    <BookList books={books} showDeleteAction="true"/>

                </React.Fragment>
            }

        </div>
    )
};

export default Home;
