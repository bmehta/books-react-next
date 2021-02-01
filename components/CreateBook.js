import React, { useState } from 'react';
import fire from '../config/fire-config';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            "title": title,
            "review": review
        });
        fire.firestore()
            .collection('books')
            .add({ title, review });
        setTitle('');
        setReview('');
    };
    return (
        <div>
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
export default CreateBook;
