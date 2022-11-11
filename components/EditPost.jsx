import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from '../src/context/DataContext';

const EditPost = () => {
    const { posts, postData, setPostData, handleChange, handleEdit } =
        useContext(DataContext);

    const { id } = useParams();
    const foundPost = posts.find((post) => post.id.toString() === id);

    useEffect(() => {
        if (foundPost) {
            setPostData({
                title: foundPost.title,
                body: foundPost.body,
            });
        }
    }, [posts]);
    return (
        <main className="NewPost">
            {foundPost ? (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="newPostForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            name="title"
                            type="text"
                            placeholder="Post title"
                            value={postData.title}
                            onChange={handleChange}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            name="body"
                            placeholder="Type post body here"
                            required
                            cols="30"
                            rows="10"
                            value={postData.body}
                            onChange={handleChange}
                        />
                        <button onClick={() => handleEdit(foundPost.id)}>
                            Save
                        </button>
                    </form>
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
        </main>
    );
};

export default EditPost;
