import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../src/context/DataContext';

const PostPage = () => {
    const { posts, handleDelete } = useContext(DataContext);

    const { id } = useParams();
    const foundPost = posts.find((post) => post.id.toString() === id);

    return (
        <main className="PostPage">
            <article className="post">
                {foundPost ? (
                    <>
                        <h2>{foundPost.title}</h2>
                        <p className="postDate">{foundPost.datetime}</p>
                        <p className="postBody">{foundPost.body}</p>
                        <Link to={`/posts/edit/${foundPost.id}`}>
                            <button
                                className="editButton"
                                style={{ marginRight: '20px' }}
                            >
                                Edit
                            </button>
                        </Link>
                        <button
                            className="deleteButton"
                            type="button"
                            onClick={() => handleDelete(foundPost.id)}
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <>
                        <h2>Post not found</h2>
                        <p>Well, isn't this a pickle.</p>
                        <p>
                            <Link to="/">Back to Home</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
