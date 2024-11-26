import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams(); 
    // console.log(id)
    const navigate = useNavigate();
    const [user, setUser ] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                // console.log(response)
                setUser (response.data);
            } catch (error) {
                setError("Error fetching user data.");
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser ();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser ((prevUser ) => ({ ...prevUser , [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/${id}`, user);
            navigate('/dashboard');
        } catch (error) {
            setError("Error updating user data.");
            console.error("Error updating user data:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Edit;