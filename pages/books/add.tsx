import React, { useState } from 'react';
import fire from '../../config/fire-config';
import Book from '../../components/Book';

export interface IBook {
    id: string,
    previewLink: string,
    thumbnail: string,
    title: string
}

const Add = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<IBook[]>([]);

    const handleAdd = async (event, book) => {
        event.preventDefault();
        console.log(JSON.stringify(book));

        const volumeId = book.id;
        const { authors = [], previewLink = '', publisher ='', thumbnail = '', title = '' } = book;

        await fire.firestore()
            .collection('books')
            .add({ volumeId, authors, previewLink, publisher, thumbnail, title });

    };

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
            <h2>Search for a Suggestion</h2>
            <div>
                <input type="text" value={searchTerm} onChange={handleSearch}/>
            </div>
            <div>
                {books.map(book =>
                    <Book key={book.id} book={book} showAddAction="true"/>
                )}
            </div>
        </div>
    )
};
export default Add;
