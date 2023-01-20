import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


// Test 1
test('renders without errors', () => {
    render(
        <ContactForm />
    );
});

// Test 2
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

// Test 3
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // arrange
    render(<ContactForm />)

    const firstNameField = screen.getByLabelText(/first name*/i);
    // act 
    userEvent.type(firstNameField, "abc"); // < 5 characters length
    const errorMessages = await screen.findAllByTestId(/error/i);

    // assert
    expect(errorMessages).toHaveLength(1);

});

// Test 4
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId(/error/i);
        expect(errorMessages).toHaveLength(3);
    });
});

// Test 5
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // arrange
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput  = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);

    // act
    userEvent.type(firstNameInput, "Grace");
    userEvent.type(lastNameInput, "Hopper");
    userEvent.type(emailInput, "gracehopper");

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId(/error/i);
        expect(errorMessages).toHaveLength(1);
    });
});

// Test 6
test('renders ONE error message if user submits without entering email address', async () => {
    // arrange
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput  = screen.getByLabelText(/last name*/i);
    const submitButton = screen.getByRole('button');
    // act
    userEvent.type(firstNameInput, "Grace");
    userEvent.type(lastNameInput, "Hopper");
    userEvent.click(submitButton);

    const errorMessages = await screen.queryAllByTestId("error");

    // assert
    expect(errorMessages).toHaveLength(1);
});

// Test 7
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, "miss.ada.lovelace");

    // const errorMessage = await screen.queryByTestId("error");
    // expect(errorMessage).toHaveTextContent("email must be a valid email address");

    const errorMessage = await screen.getByText(/email must be a valid email address/i);

    expect(errorMessage).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const submitButton = screen.getByRole('button');

    userEvent.type(firstNameInput, "Sawyer");
    userEvent.type(emailInput, "sawyer.welter@gmail.com");
    userEvent.click(submitButton);

    const errorMessage = screen.queryByText(/lastName is a required field/);

    expect(errorMessage).toBeInTheDocument();
});

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // render(<ContactForm />);
// });

// test('renders all fields text when all fields are submitted.', async () => {
    // render(<ContactForm />);
// });
