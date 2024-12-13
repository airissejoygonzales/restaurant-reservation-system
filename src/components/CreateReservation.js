import React, {useState, useEffect, useRef} from "react";
import {useUser} from "./UserProvider";
import WelcomePrompt from "./WelcomePrompt";
import {CustomerName, CustomerPhoneNumber, CustomerPreferredComms, ReservationBooking, GuestCount} from "./InputFields";

const CreateReservation = () => {
    const { customer, setCustomer } = useUser();  // Access the email from the context

    // Refs for form fields to manage focus or reset the form
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const guestCountRef = useRef(null);

    // Initial form data structure
    const initialFormData = {
        customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            preferredComms: customer.preferredComms || 'EMAIL'
        },
        reservationDate: "",
        guestCount: 1
    };

    // Get current date and time in the correct format for datetime-local input
    const getMinDateTime = () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Month is 0-indexed
        const day = ("0" + (currentDate.getDate())).slice(-2);
        const hours = ("0" + currentDate.getHours()).slice(-2);
        const minutes = ("0" + currentDate.getMinutes()).slice(-2);

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // State for form field
    const [formData, setFormData] = useState(initialFormData);

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, [formData.customer.name]); // Focus the input when inputEmail changes

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (phoneRef.current) {
            phoneRef.current.focus();
        }
    }, [formData.customer.phoneNumber]); // Focus the input when inputEmail changes

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (guestCountRef.current) {
            guestCountRef.current.focus();
        }
    }, [formData.guestCount]); // Focus the input when inputEmail changes

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => {
            // if (["name", "phoneNumber", "preferredComms"].includes(name)) {
                // Update the customer field
                return {
                    ...prevData,
                        [name]: value,
                    customer: {
                        ...prevData.customer,
                        [name]: value,
                        email: customer.email,
                        id: customer.id
                    },
                };
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("form data"+JSON.stringify(formData))
        try {
            // POST request to the API endpoint
            const response = await fetch("http://localhost:8080/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Convert the data to JSON
            });

            if (!response.ok) {
                throw new Error("Error creating reservation");
            }

            const data = await response.json(); // Parse the response as JSON
            console.log("Reservation Created:", data); // Log the response data

            alert("Reservation successfully created!");

            //Reinitialize
            setCustomer(data.customer);
            // Reset form data after successful submission
            setFormData(initialFormData); // Reinitialize form data


        } catch (error) {
            console.error("Error:", error);
            alert("There was an error with your reservation.");
        }
    };


    if (!customer.email) {
        return <WelcomePrompt/>;
    }

    return (
        <div>
            <h1>Schedule a new reservation for {customer.name ? customer.name : customer.email}</h1>
            <form onSubmit={handleSubmit}>
                {customer.id ? (
                    <></>
                ) : (
                    <>
                        <CustomerName ref={nameRef} value={formData.customer.name} onChange={handleChange} />
                        <CustomerPhoneNumber ref={phoneRef} value={formData.customer.phoneNumber} onChange={handleChange} />
                        <CustomerPreferredComms value={formData.customer.preferredComms} onChange={handleChange} />
                    </>
                )}
                <ReservationBooking value={formData.reservationDate} onChange={handleChange} min={getMinDateTime()}/>
                <GuestCount ref={guestCountRef} value={formData.guestCount} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateReservation;