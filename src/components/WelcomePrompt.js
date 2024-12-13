import React, { useState, useEffect, useRef } from 'react';
import { useUser } from './UserProvider'; // Import useEmail hook to access the context

function WelcomePrompt() {
    const { customer, setCustomer } = useUser(); // Access email and saveEmail from context

    const [inputEmail, setInputEmail] = useState('');
    const inputRef = useRef(null); // Create a ref for the input field

    // Handle email input change
    const handleEmailChange = (e) => {
        setInputEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputEmail) {
            alert('Please enter an email.');
            return;
        }

        console.log('Fetching customer for email:', inputEmail);

        fetch(`http://localhost:8080/customers/${inputEmail}`)
            .then((response) => {
                console.log('Customera data:', response);
                if (!response.ok) {
                    throw new Error('Customer not found');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Customer data:', data);

                if (data != null) {
                    setCustomer(data); // Set the customer with full data
                } else {
                    setCustomer({ email: inputEmail }); // Fallback to only setting the email
                }
            })
            .catch((error) => {
                console.error('Error fetching customer:', error);
            });
    };

    // Ensure the input field is focused after the render
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputEmail]); // Focus the input when inputEmail changes

    return (
        <div>
            <h1>Welcome to our Restaurant!</h1>
            {customer.email ? (
                <p>
                    Hi, {customer.name ? customer.name : customer.email}! Good day to you :)
                </p> // If email exists, display welcome message
            ) : (
                <div className="email-form-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef} // Use ref to focus the input
                            type="email"
                            value={inputEmail}
                            onChange={handleEmailChange}
                            placeholder="Please enter your email to start"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default WelcomePrompt;


