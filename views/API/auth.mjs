import axios from 'axios'


const API = 'http://127.0.0.1:4000/api';

const loginRequest = async (user) => {
    try {
        const response = await axios.post(`${API}/loginuser`, user);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


