import React, { useState, useEffect } from 'react';
import { useUser } from './UserProvider';  // Import useEmail hook to access the email
import WelcomePrompt from './WelcomePrompt';
import {useNavigate} from "react-router-dom";
import {useFetchData} from "../hooks/useFetchData";

function Reservation() {
    const navigate = useNavigate();
    const { customer } = useUser();  // Access the email from the context
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const { responseData, fetchOnDemand } = useFetchData();
    const { data, error, loading, fetchOnDemand } = useFetchData(); // Destructure hook values

    useEffect(() => {
        // Only fetch data if customer email is available
        if (customer.id) {
            fetchOnDemand(`/reservations/customer/${customer.id}`, 'GET')
                .then(() => {
                    console.log('Data fetched successfully:', data);
                })
                .catch((err) => {
                    console.error('Fetch error:', err);
                });
        } else if(customer.email){
            alert('You have no reservations yet. Redirecting to schedule a reservation page...')
            navigate('/'); // Redirects to create new reservation page
        }
    }, [customer]);  // Effect runs when customer email changes

    if (!customer.email) {
        return <WelcomePrompt/>;
    }


    // Handle re-fetching of data
    const reloadData = () => {
        fetchOnDemand(`/reservations/customer/${customer.id}`, 'GET').then(r => {});
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleEdit = (row) => {
        alert(`Edit row with ID: ${row.id}`);
        // Logic for editing the row can go here
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to cancel this row?")) {
            fetchOnDemand(`/reservations/${id}/cancel`, 'PATCH').then(() => reloadData());
        }
    };

    return (
        <div>
            <h1>Reservations for {customer.name ? customer.name : customer.email}</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Reservation Date & Time</th>
                    <th>Number of Guests</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data?.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.guestCount}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <button
                                onClick={() => handleEdit(reservation)}
                                disabled={reservation.status !== 'CONFIRMED'}
                            >Edit</button>
                            <>  </>
                            <button onClick={() => handleDelete(reservation.id)}>Cancel</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reservation;
