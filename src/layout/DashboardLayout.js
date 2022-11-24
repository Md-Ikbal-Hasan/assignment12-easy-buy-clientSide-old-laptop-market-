import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import useAdmin from '../hooks/useAdmin'
import useSeller from '../hooks/useSeller'
const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to='/dashboard'>My Order</Link></li>
                        <li><Link to='/'>Test 2</Link></li>
                        <li><Link to='/'>Test 3</Link></li>

                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                            </>
                        }




                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;