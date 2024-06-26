// React
import { ReactElement } from "react";

// Styles
import './NavBar.css';

const NavBar = (): ReactElement => {
    return (
        <nav className="NavBar">
            <h1 className="app-title">Order Dashboard</h1>
            <ul>
                <li>
                    <a href="#kpis">Orders</a>
                </li>
                <li>
                    <a href="#scatters">Cycle Data</a>
                </li>
                <li>
                    <a href="#streaks">Download Report</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;