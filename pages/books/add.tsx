import React, { useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface IBook {
    id: string
    volumeInfo: {
        title: string,
        imageLinks: {
            smallThumbnail: string
        }
        previewLink: string
    }
}

export interface IBooks {
    items: IBook[]

}

const Add = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<IBooks>();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({
            "title": title,
            "review": review
        });
        await fire.firestore()
            .collection('books')
            .add({ title, review });
        setTitle('');
        setReview('');
        router.push("/");
    };
    const handleSearch = async (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);

        if (searchTerm && searchTerm.trim() !== '') {
            const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&projection=lite&maxResults=10&key=${googleApiKey}` );
            const books = await res.json() as IBooks;
            setBooks(books);
        }

    }
    return (
        <div>
            <h2>Search for a book to add</h2>
            <div>
                <input type="text" value={searchTerm} onChange={handleSearch}/>
            </div>
            <ul>
                {books.items?.map(book =>
                    <li key={book.id}>

                        <Link href={book.volumeInfo.previewLink}>
                            <div>
                                <img src={book.volumeInfo?.imageLinks?.smallThumbnail}></img>
                                <span>{book.volumeInfo?.title}</span>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title<br />
                    <input type="text" value={title}
                           onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                    Review<br />
                    <textarea value={review}
                              onChange={({target}) => setReview(target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};
export default Add;
