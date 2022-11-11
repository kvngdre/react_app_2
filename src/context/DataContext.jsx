import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/post';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState({ title: '', body: '' });
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch(
        'http://localhost:3540/posts'
    );

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const matches = posts.filter((post) => {
            return (
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
            );
        });
        setSearchResults(matches.reverse());
    }, [posts, search]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            id: posts[posts.length - 1].id + 1,
            datetime: format(new Date(), 'MMMM dd, yyyy pp'),
            ...postData,
        };

        try {
            const response = await api.post('/posts', newPost);
            setPostData({ title: '', body: '' });
            setPosts((prevPosts) => [...prevPosts, response.data]);
            navigate('/');
        } catch (error) {
            console.log('error==', error);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        try {
            const payload = {
                ...postData,
                datetime,
            };
            const response = await api.patch(`/posts/${id}`, payload);
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === id) return { id, ...response.data };
                    return post;
                })
            );
            setPostData({ title: '', body: '' });
            navigate(`/`);
        } catch (error) {
            console.log('error==>', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/posts/${id}`);
            // const newPosts = posts.filter((post) => post.id !== id);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DataContext.Provider
            value={{
                width,
                search,
                setSearch,
                searchResults,
                fetchError,
                isLoading,
                postData,
                handleChange,
                handleSubmit,
                handleDelete,
                posts,
                postData,
                setPostData,
                handleEdit,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
