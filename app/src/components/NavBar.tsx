// React
import { ReactElement } from "react";

// Images
import TableViewIcon from "../assets/images/icons/table-view.svg"
import DownloadIcon from "../assets/images/icons/download.svg"
import FindReplaceIcon from "../assets/images/icons/find-replace.svg"

// Styles
import './NavBar.css';

const NavBar = (): ReactElement => {
    return (
        <nav className="NavBar">
            <h1 className="app-title">Order Dashboard</h1>
            <ul>
                <li>
                    <img src={TableViewIcon} className="icon" alt="Table View"/>
                </li>
                <li>
                    <img src={FindReplaceIcon} className="icon" alt="Find Replace"/>
                </li>
                <li>
                    <img src={DownloadIcon} className="icon" alt="Download"/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;