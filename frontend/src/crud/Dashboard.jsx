import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const deleteUser  = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/${id}`);
            // console.log(response.data);
            // Update the state to remove the deleted user
            setData((prevData) => prevData.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const edituser=async(id)=>{
        // alert(id)
        navigate(`/edit/${id}`);
    }   

    return (
        <div>
            <h2>Table Data</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td> 
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={()=>edituser(user.id)}>Edit</button>
                                    <button onClick={() => deleteUser (user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;