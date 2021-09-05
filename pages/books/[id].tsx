import React, { useState } from 'react';
import fire from '../../config/fire-config'
import Link from 'next/link'

const Book = (props): JSX.Element => {
    const [ title, setTitle ] = useState(props.book.title);
    const [ review, setReview ] = useState(props.book.review);

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async (event) => {
        event.preventDefault();
        console.log({
            "title": title,
            "review": review
        });

        await fire.firestore()
            .collection('books')
            .doc(props.book.id)
            .update({title, review});
        setIsEditing(false)
    };

    return (
        <div>
            {!isEditing ?
                <div>
                    <h2>{title}</h2>
                    <p>
                        {review}
                    </p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            :
                <div>
                    <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
                    <textarea value={review} onChange={({target}) => setReview(target.value)}/>
                    <button onClick={handleSave}>Save</button>
                </div>
            }

            <Link href="/">
                <a>Back</a>
            </Link>
        </div>
    )
};
export const getServerSideProps = async ({ query }) => {
    const content = { title: null, review: null };
    await fire.firestore()
        .collection('books')
        .doc(query.id)
        .get()
        .then(result => {
            content['title'] = result.data().title;
            content['review'] = result.data().review;
        });
    return {
        props: {
            book: {
                id: query.id,
                title: content.title,
                review: content.review
            }
        }
    }
};
export default Book;
