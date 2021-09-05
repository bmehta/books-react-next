import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fire from '../config/fire-config';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        });

    useEffect(() => {
        fire.firestore()
            .collection('books')
            .onSnapshot(snap => {
                const books = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBooks(books);
            });
    }, []);

    const handleLogout = () => {
        fire.auth()
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
            </Head>
            <h1>Books! A person's best friends</h1>
            {notification}
            {!loggedIn
                ?
                <div>
                    <Link href="/users/register">
                        <a>Register</a>
                    </Link> |
                    <Link href="/users/login">
                        <a> Login</a>
                    </Link>
                </div>
                :
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    &nbsp;&nbsp;
                    <Link href="/books/add">
                        <a>Add a Book</a>
                    </Link>
                    &nbsp;&nbsp;
                    <Link href="/books/search">
                        <a>Search</a>
                    </Link>
                    <ul>
                    {books.map(book =>
                        <li key={book.id}>
                            <Link href="/books/[id]" as={'/books/' + book.id}>
                                <a>{book.title}</a>
                            </Link>
                        </li>
                    )}
                    </ul>

                </div>
            }

        </div>
    )
};

export default Home;
