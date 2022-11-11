import { useContext } from "react";
import DataContext from "../src/context/DataContext";

const NewPost = () => {
    const { postData, handleChange, handleSubmit } = useContext(DataContext);
    
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
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
                <button>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;
