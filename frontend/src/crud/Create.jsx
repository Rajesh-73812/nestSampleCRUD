import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate=useNavigate()
    const [user, setUser ] = useState({ name: "", email: "" });

    // handle submit
    const handlesubmit = async (e) => {
        e.preventDefault();
    
        const googleSheetUrl = "https://script.google.com/macros/s/AKfycbx6cNkeZ6ebyUFFpxeHrxbzDCn2xketu0crue-KGOp2z2OMcEMBI4sekuT-XuQzMHye/exec";
    
        try {
            // Send data to Google Sheets
            const googleResponse = await fetch(googleSheetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    Name: user.name,
                    Email: user.email,
                }),
            });
    
            const googleResult = await googleResponse.text();
            console.log('Google Sheets Response:', googleResult);
            alert(googleResult);
    
            // Send data to your backend
            const dbResponse = await axios.post("http://localhost:3000/users", user);
            console.log('DB Response:', dbResponse);
    
            if (dbResponse.status === 201) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser ((prevstate) => ({ ...prevstate, [name]: value }));
    };

    return (
        <div>
            <div>
                <h1>Create a new user</h1>
            </div>
            <div>
                <form onSubmit={handlesubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="name" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" onChange={handleChange} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;