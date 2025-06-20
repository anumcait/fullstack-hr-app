import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import './Header.css';
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [userName, setUserName] = useState('Guest');
    const [currentDate, setCurrentDate] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate function from React Router

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState); // Toggle the dropdown state
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option); // Update selected project
        setDropdownOpen(false); // Close the dropdown after selection
    };

    useEffect(() => {
        // Fetch the logged-in user's name from localStorage or default to "Guest"
        const storedUser = localStorage.getItem('userName') || 'Guest';
        setUserName(storedUser);

        // Set current date
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    // Handle the logout function
    const handleLogout = () => {
        // Clear user data (if stored in localStorage or session)
        localStorage.removeItem('userName'); // or sessionStorage.removeItem('userName');
        setUserName('Guest'); // Reset user state to "Guest"

        // Redirect to login page
        navigate('/'); // Assuming "/login" is your login route
    };

    return (
        <>
            <header className="dashboard-header">
                <div className="top-bar">
                    <div className="menu-container">
                        <div className="menu">
                            <div className="menu-item dropdown">
                                HR <span className="arrow"><IoMdArrowDropdown /></span>
                                <ul className="dropdown-content">
                                    <li className="has-submenu">
                                        <span className="dropdown-text">Leaves</span>
                                        <span className="right-arrow">▶</span>
                                        <ul className="submenu">
                                            <li>
                                                <Link to="/leave-form" className="link-style">
                                                    Leave-Application
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/leave-report" className="link-style">
                                                    Leaves
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="menu-item">SETUP</div>
                            <div className="menu-item">HR
                                <span className="arrow"><IoMdArrowDropdown /></span> 
                                
                            </div>
                            <div className="menu-item">PLANNING</div>
                            <div className="menu-item">ENGINEERING</div>

                            <div className="menu-item dropdown">
                                PURCHASE <span className="arrow"><IoMdArrowDropdown /></span>
                                <ul className="dropdown-content">
                                    <li className="has-submenu">
                                        <span className="dropdown-text">Site</span>
                                        <span className="right-arrow">▶</span>
                                        <ul className="submenu">
                                            <li>
                                                <Link to="/mrn-list" className="link-style">
                                                    MRN List
                                                </Link>
                                            </li>
                                            <li>MRN</li>
                                            <li>
                                                <Link to="/quality-approval" className="link-style">
                                                    Quality Approval
                                                </Link>
                                            </li>
                                            <ul>
                                                <li className="has-submenu">
                                                    Opening
                                                    <ul className="submenu">
                                                        <li>
                                                            <Link to="/opening-quantity" className="link-style">
                                                                Add
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/opening-add" className="link-style">
                                                                Edit
                                                            </Link>
                                                        </li>

                                                    </ul>
                                                </li>
                                            </ul>

                                            <li>
                                                <Link to="/stock-variation" className="link-style">
                                                    Stock Variation
                                                </Link>
                                            </li>
                                        </ul>

                                    </li>
                                    <li className="has-submenu">
                                        <span className="dropdown-text">Store</span>
                                        <span className="right-arrow">▶</span>
                                        <ul className="submenu">

                                            <li>
                                                <Link to="/issue-material" className="link-style">
                                                    Issue
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/contractor-out-material" className="link-style">
                                                    Contractor Out
                                                </Link>
                                            </li>
                                            <li>Manual Material Transfer</li>
                                            <li>Issue Return</li>
                                            <li>Receive Transfer Material</li>
                                            <li>Return Rejected Material</li>
                                            <li>Set Surplus Item</li>
                                            <li>Freeze Quantity Issue</li>
                                            <li>Contractor Debit Note</li>
                                            <li>Report</li>
                                            <li>Vendor Material Return</li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <span className="dropdown-text">Store Reports</span>
                                        <span className="right-arrow">▶</span>
                                        <ul className="submenu">

                                            <li>
                                                <Link to="/stock-in-hand" className="link-style">
                                                    Stock In Hand
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/stock-valuation" className="link-style">
                                                    Stack Valuation In Hand
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/construction-Stock-issue" className="link-style">
                                                    Construction &Stock Issue
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/stock-transfer-register" className="link-style">
                                                    Stock Transfer Register
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/stock-transit-register" className="link-style">
                                                    Stock Transit Register
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/item-stock-group" className="link-style">
                                                    Item Group Wise Stock
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/pending-item-stock" className="link-style">
                                                    Stock Aging Report
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/company-stock" className="link-style">
                                                    Company Stock
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/item-stock-report" className="link-style">
                                                    Company Item Wise Stoc
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/material-stock-wages" className="link-style">
                                                    Meterial Stock Wages
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/rejected-stock" className="link-style">
                                                    Rejected Stock
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/process-item-stock" className="link-style">
                                                    Item Process Stock
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/project-material" className="link-style">
                                                    project Material Qty
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/local-issue-report" className="link-style">
                                                    Location Wise Issue
                                                </Link>
                                            </li>

                                            <ul>
                                                <li className="has-submenu">
                                                    Contractor
                                                    <ul className="submenu">
                                                        <li>
                                                            <Link to="/contractor-stock" className="link-style">
                                                                Stock
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/Contractor-closing-stock" className="link-style">
                                                                closing Stock
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/Contractor-wastage-report" className="link-style">
                                                                Wastage
                                                            </Link>
                                                        </li>

                                                    </ul>
                                                </li>
                                            </ul>


                                            <li>
                                                <Link to="/report-builder" className="link-style">
                                                    Report  Builder
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="user-info">
                        <span>{userName}</span>
                        <span>{currentDate}</span>

                        {/* Home Button */}
                        <Link to="/dashboard">
                            <FaHome className="icon-main" />
                        </Link>

                        {/* Logout Button */}
                        <div onClick={handleLogout} className="icon-main">
                            <IoExitOutline />
                        </div>

                        {/* Select Project Dropdown */}
                        {/* <div className="search-dropdown" onClick={toggleDropdown}>
                            <input
                                type="text"
                                placeholder="Select a Project"
                                value={selectedOption}
                                readOnly
                            />
                            <span className="icon">
                                <MdArrowDropDownCircle />
                            </span>
                        </div> */}

                        {/* Fullscreen dropdown, will be shown only if dropdownOpen is true */}
                        {/* {dropdownOpen && (
                            <div className="dropdown-list">
                                <ul >
                                    <li onClick={() => handleSelectOption('Select Our Project')}>
                                        --Select Our Project--
                                    </li>
                                    <li onClick={() => handleSelectOption('Suvih')}>Suvih</li>
                                    <li onClick={() => handleSelectOption('Suvih-2')}>Suvih-2</li>
                                </ul>
                            </div>
                        )} */}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
