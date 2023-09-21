import axios from "axios"
import { toast } from "react-hot-toast";

const url = 'http://localhost:8080/api'


export const getAllCountries = async() =>{
    try {
        const response = await axios.get(`${url}/getAllCountryDetails`);
        return response.data.countries
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}

export const getStatesWithisoCode = async(isoCode) =>{
    try {
        const response = await axios.post(`${url}/getStates`,{isoCode:isoCode});
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}

export const getCitiesWithIsoCode = async(stateIsoCode,countryIsoCode)=>{
    try {
        const response = await axios.post(`${url}/getCitiesWithIsoCode`,{stateCode:stateIsoCode,countryIsoCode:countryIsoCode});
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.msg);
    }
}

export const getRegistrationDetails = async() =>{
    try {
        const response = await axios.get(`${url}/getRegistrationDetails`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}

export const RegisterDetails = async(formData) =>{
    try {
        const response = await axios.post(`${url}/insertForm`,formData);
        return response.data;
    } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.msg);
    }
}