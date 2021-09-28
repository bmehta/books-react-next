import React, { useState, useEffect } from 'react';
import Book from './Book';

const DivStyle = {
    marginBottom: "15px"
};

const BookList = (props): JSX.Element => {

    const [books, setBooks ] = useState(props.books);

    useEffect(() => {
        setBooks(props.books);
    }, [props.books]);

    return (
        <React.Fragment>
            {books.map(book =>
                <div key={book.id} style={DivStyle}>
                    <Book book={book} showAddAction={props.showAddAction} showDeleteAction={props.showDeleteAction} showPreviewAction={props.showPreviewAction}/>
                </div>
            )}
        </React.Fragment>
    );
};

export default BookList;
