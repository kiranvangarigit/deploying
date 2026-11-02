import React, { useState } from "react";

function Registration() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        gender: ""
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {

                const data = await response.json();

                console.log("Registration successful:", data);

                setMessage("Registration successful!");

                // Clear form
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    mobile: "",
                    gender: ""
                });

            } else {

                const error = await response.text();

                console.log("Error:", error);

                setMessage("Registration failed!");

            }

        } catch (error) {

            console.error("API Error:", error);

            setMessage(
                "Unable to connect to server. Make sure Spring Boot is running."
            );
        }
    };

    return (
        <div>

            <h2>User Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

            <h3>{message}</h3>

        </div>
    );
}

export default Registration;