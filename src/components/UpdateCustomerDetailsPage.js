import React, {useState, useEffect, useRef} from "react";
import {useUser} from "./UserProvider";
import {CustomerEmail, CustomerName, CustomerPhoneNumber, CustomerPreferredComms} from "./InputFields";

import {useNavigate} from "react-router-dom";


const UpdateCustomerDetailsPage = () => {
    const navigate = useNavigate();
    const { customer, setCustomer } = useUser() ;

    // Initial form data structure
    const initialFormData = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        preferredComms: customer.preferredComms
    };

    // State for form field
    const [formData, setFormData] = useState(initialFormData);

    // Refs for form fields to manage focus or reset the form
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const preferredCommsRef = useRef(null);


    useEffect(() => {
        if(customer.id == null){
            alert('You have no reservations yet. Redirecting to schedule a reservation page...')
            navigate('/'); // Redirects to create new reservation page
        } else {
            setFormData(initialFormData); // Reinitialize form data
        }

    }, [customer, navigate]);

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, [formData.name]); // Focus the input when inputEmail changes

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [formData.email]); // Focus the input when inputEmail changes

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (phoneNumberRef.current) {
            phoneNumberRef.current.focus();
        }
    }, [formData.phoneNumber]); // Focus the input when inputEmail changes

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (preferredCommsRef.current) {
            preferredCommsRef.current.focus();
        }
    }, [formData.preferredComms]); // Focus the input when inputEmail changes


    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                    [name]: value,
                    id: customer.id
            };
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("form data"+JSON.stringify(formData))
        try {
            // POST request to the API endpoint
            const response = await fetch(`http://localhost:8080/customers`, {
                method: "PUT",
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

            alert("Customer details successfully updated!");

            //Reinitialize
            setCustomer(data);
            // Reset form data after successful submission
            setFormData(initialFormData); // Reinitialize form data

        } catch (error) {
            console.error("Error:", error);
            alert("There was an error with your customer update.");
        }
    };

    return (
        <div>
            <h1>Updating details for {customer.name}</h1>
            <form onSubmit={handleSubmit}>
                <CustomerName ref={nameRef} value={formData.name} onChange={handleChange} />
                <CustomerPhoneNumber ref={phoneNumberRef} value={formData.phoneNumber} onChange={handleChange} />
                <CustomerEmail ref={emailRef} value={formData.email} onChange={handleChange} />
                <CustomerPreferredComms value={formData.preferredComms} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UpdateCustomerDetailsPage;