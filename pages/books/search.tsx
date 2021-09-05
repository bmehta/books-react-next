import React, { useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link';

const Search = () => {
    //const router = useRouter();
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const handleSearch = (event) => {
        event.preventDefault();
        console.log({
            "searchTerm": searchTerm
        });
        setSearchResults([{id: 'id1', title: 'title1'}, {id: 'id2', title: 'title2'}]);
        fire.firestore()
            .collection('books')
            .onSnapshot(snap => {
                const books = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSearchResults(books)
            });
    }
    return (
        <div>
            <h2>Add Book</h2>
            <label for="site-search">Search books</label>
            <input type="search" id="site-search" onChange={({target}) => setSearchTerm(target.value)}/>

            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map(book =>
                    <li key={book.id}>
                        <Link href="/books/[id]" as={'/books/' + book.id}>
                            <a>{book.title}</a>
                        </Link>
                    </li>
                )}
            </ul>

        </div>
    )
};
export default Search;
