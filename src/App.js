// import React from 'react';  // Import React
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import necessary components from react-router-dom
import './App.css';  // Import your CSS for styling
import ReservationsPage from "./components/Reservations";
import { UserProvider, useUser } from './components/UserProvider';
import CreateReservation from "./components/CreateReservation";
import UpdateCustomerDetailsPage from "./components/UpdateCustomerDetailsPage";

function App() {
    const { customer } = useUser() || { customer: null };

    return (
            <UserProvider>  {/* Wrap your app with UserProvider */}
        <Router>
            <div className="App">
                {/* Navigation Bar */}
                <div className="nav-container">
                    {/*<Link to="/" className="nav-button">WelcomePrompt</Link>*/}
                    <Link to="" className="nav-button">Schedule A Reservation</Link>
                    <Link to="/reservations" className="nav-button">Manage Reservations</Link>
                    {/*{customer?.id && (*/}
                        <Link to="/update-customer-details" className="nav-button">
                            Update Customer Details Page
                        </Link>
                    {/*)}*/}
                </div>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<CreateReservation/>} />
                    <Route path="/reservations" element={<ReservationsPage/>} />
                    <Route path="/update-customer-details" element={<UpdateCustomerDetailsPage/>} />
                </Routes>
            </div>
        </Router>
    </UserProvider>
    );
}

export default App;
