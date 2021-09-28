import React, { useState } from 'react';
import fire from '../../components/Fire';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Book = (props): JSX.Element => {
    const router = useRouter();
    const [ title, setTitle ] = useState(props.book.title);
    const [ authors, setAuthors ] = useState(props.book.authors);

    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();
        console.log({
            "title": title,
            "authors": authors
        });

        await fire().firestore()
            .collection('books')
            .doc(props.book.id)
            .delete();
        router.push("/");
    };

    const handleSave = async (event) => {
        event.preventDefault();
        console.log({
            "title": title,
            "authors": authors
        });

        await fire().firestore()
            .collection('books')
            .doc(props.book.id)
            .update({title, authors});
        setIsEditing(false)
    };

    return (
        <div>
            {!isEditing ?
                <div>
                    <h2>{title}</h2>
                    <p>
                        {authors}
                    </p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            :
                <div>
                    <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
                    <textarea value={authors} onChange={({target}) => setAuthors(target.value)}/>
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
    const content = { title: null, authors: [] };
    await fire().firestore()
        .collection('books')
        .doc(query.id)
        .get()
        .then(result => {
            content['authors'] = result.data().authors;
            content['title'] = result.data().title;
        });
    return {
        props: {
            book: {
                id: query.id,
                title: content.title,
                authors: content.authors
            }
        }
    }
};
export default Book;
