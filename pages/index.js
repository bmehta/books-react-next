import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreateBook from '../components/CreateBook';


const Home = () => {
    const [books, setBooks] = useState([]);
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
    return (
        <div>
            <Head>
                <title>Binita's book app: Made with React, Next and Firebase</title>
            </Head>
            <h1>Books! A persons best friends</h1>
            <ul>
                {books.map(book =>
                    <li key={book.id}>
                        {book.title}
                    </li>
                )}
            </ul>
            <CreateBook />
        </div>
    )
};

export default Home;
