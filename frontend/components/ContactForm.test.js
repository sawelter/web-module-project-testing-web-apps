import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(
        <ContactForm />
    );
});

test('renders the contact form header', () => {
    // arrange
    render(
        <ContactForm />
    );

    // act
    const header = screen.getByText(/contact form/i);

    // assert
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // assert
    render(<ContactForm />)

    // act 
    const firstNameField = screen.getByLabelText(/first name*/i);

    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, "ab");

    userEvent.type(firstNameField, "abc"); // < 5 characters length
    const errorMessages = await screen.findAllByTestId(/error/i);

    // assert
    expect(errorMessages).toHaveLength(1);

});

// test('renders THREE error messages if user enters no values into any fields.', async () => {
//     fail;
// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
//     fail;
// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
//     fail;
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//     fail;
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
//     fail;
// });

// test('renders all fields text when all fields are submitted.', async () => {
//     fail;
// });
