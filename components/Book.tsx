import React, { useState } from 'react';
import Link from 'next/link';


const Book = (props) => {
    const { book } = props;

    return (
        <Link href={book.previewLink}>
            <div>
                <img src={book.thumbnail}></img>
                <span>{book.title}</span>
            </div>
        </Link>
    )
};
export default Book;
