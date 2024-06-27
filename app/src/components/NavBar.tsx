// React
import { ReactElement } from "react";

// Images
import TableViewIcon from "../assets/images/icons/table-view.svg?react"
import DownloadIcon from "../assets/images/icons/download.svg?react"
import FindReplaceIcon from "../assets/images/icons/find-replace.svg?react"

// Styles
import './NavBar.css';

const NavBar = (): ReactElement => {
    return (
        <nav className="NavBar">
            <h1 className="app-title">Order Dashboard</h1>
            <ul>
                <li>
                    <TableViewIcon className="icon" />
                </li>
                <li>
                    <FindReplaceIcon className="icon" />
                </li>
                <li>
                    <DownloadIcon className="icon" />
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;