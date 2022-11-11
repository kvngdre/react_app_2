import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="Missing">
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing 😑.</p>
            <p>
                <Link to='/'>Visit our homepage</Link>
            </p>
        </main>
    );
};

export default NotFound;