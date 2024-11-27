import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate=useNavigate()
    const [user, setUser ] = useState({ name: "", email: "",profile:null });

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
    
            // Send data to your backend (with file upload)
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('profile', user.profile);

            const response = await axios.post("http://localhost:3000/users", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('DB Response:', response);
    
            if (response.status === 201) {
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser((prevState) => ({ ...prevState, profile: file }));
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
                    <div>
                        <label htmlFor="profile">Profile</label>
                        <input type="file" name='profile' onChange={handleFileChange}/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;