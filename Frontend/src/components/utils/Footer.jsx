import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Footer() {
    const { isAuthorized } = useContext(AppContext);

    return (
        <footer
            className={`bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left mb-0  ${isAuthorized? 'visible': 'hidden'}`}>
            <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                © 2024 Copyright: Shashank Vishwakarma
            </div>
        </footer>
    );
}

export default Footer;