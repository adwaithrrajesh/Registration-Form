import axios from "axios"

const url = 'http://localhost:8080/api'


export const getAllCountries = async() =>{
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const getStatesWithCountryName = async(countryName) =>{
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/states?country=${countryName}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const getRegistrationDetails = async() =>{
    try {
        const response = await axios.get(`${url}/getRegistrationDetails`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}