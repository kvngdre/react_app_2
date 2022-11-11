import Layout from '../components/Layout';
import Home from '../components/Home';
import NewPost from '../components/NewPost';
import PostPage from '../components/PostPage';
import EditPost from '../components/EditPost';
import About from '../components/About';
import NotFound from '../components/NotFound';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
    return (
        <DataProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="posts">
                        <Route index element={<NewPost />} />
                        <Route path="edit/:id" element={<EditPost />} />
                        <Route path=":id" element={<PostPage />} />
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </DataProvider>
    );
}

export default App;
