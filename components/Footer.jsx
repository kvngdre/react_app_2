const Footer = () => {
    const today = new Date();
    return (
        <footer className="Footer">
            <p>Copyright &copy; {today.getUTCFullYear()}</p>
        </footer>
    );
};

export default Footer;
