import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className=" -mt-8  flex justify-between mx-auto max-w-screen-2xl sm:py-16 lg:px-6 font-manrope ">
            <Link to={"/"}>
                <p className="font-bold text-xl tracking-wider">Quizzy</p>
            </Link>
        </div>
    );
};

export default Header;
