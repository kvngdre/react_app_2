import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from '../src/context/DataContext';

const Header = ({ title }) => {
    const { width } = useContext(DataContext);
    return (
        <header className="Header">
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
        </header>
    );
};

Header.defaultProps = {
    title: 'React Js Blog'
}

export default Header;
