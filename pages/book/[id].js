import fire from '../../config/fire-config';
import Link from 'next/link'
const Book = (props) => {

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
    const content = {};
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
