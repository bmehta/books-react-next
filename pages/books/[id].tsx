import fire from '../../config/fire-config'
import Link from 'next/link'

const Book = (props): JSX.Element => {

    return (
        <div>
            <h2>{props.title}</h2>
            <p>
                {props.review}
            </p>
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
            title: content.title,
            review: content.review
        }
    }
};
export default Book;
