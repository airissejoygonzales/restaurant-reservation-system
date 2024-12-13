import React from "react";

// CustomerName with ref handling
export const CustomerName = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <div>
            <label htmlFor="name">Name:</label>
            <input
                ref={ref}  // Forward ref
                type="text"
                id="name"
                name="name"
                value={value || ''}
                onChange={onChange}
                required
            />
        </div>
    );
});

// CustomerEmail with ref handling
export const CustomerEmail = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <div>
            <label htmlFor="email">Email:</label>
            <input
                ref={ref}  // Forward ref
                type="email"
                id="email"
                name="email"
                value={value || ''}
                onChange={onChange}
                required
            />
        </div>
    );
});

// CustomerPhoneNumber with ref handling
export const CustomerPhoneNumber = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
                ref={ref}  // Forward ref
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={value || ''}
                onChange={onChange}
                required
            />
        </div>
    );
});

// CustomerPreferredComms (no need for ref forwarding, unless needed in the future)
export const CustomerPreferredComms = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="preferredComms">Contact me thru:</label>
            <select
                id="preferredComms"
                name="preferredComms"
                value={value}
                onChange={onChange}
                required
            >
                <option value="EMAIL">Email</option>
                <option value="SMS">Phone</option>
            </select>
        </div>
    );
};

// ReservationBooking (used for datetime input)
export const ReservationBooking = ({ value, onChange, min }) => {
    return (
        <div>
            <label htmlFor="reservationDate">Date and Time:</label>
            <input
                type="datetime-local"
                id="reservationDate"
                name="reservationDate"
                value={value}
                onChange={onChange}
                min={min}
                required
            />
        </div>
    );
};

// GuestCount with ref handling
export const GuestCount = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <div>
            <label htmlFor="guestCount">Number of Guests:</label>
            <input
                ref={ref}  // Forward ref
                type="number"
                min="1"
                id="guestCount"
                name="guestCount"
                value={value || 1}
                onChange={onChange}
                required
            />
        </div>
    );
});
