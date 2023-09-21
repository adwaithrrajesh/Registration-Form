import React, { useEffect, useState } from "react";
import { RegisterDetails, getAllCountries } from "../api/ApiCalls";
import { getStatesWithisoCode} from "../api/ApiCalls";
import { getCitiesWithIsoCode } from "../api/ApiCalls";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

export default function Form() {

  const navigate = useNavigate()

  const [countries, setCountries] = useState([]);
  const [selectedCountryIsoCode,setSelectedCountryIsoCode] = useState();
  const [states,setStates] = useState([])
  const [cities,setCities] = useState([])
  const [age,setAge] = useState()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "male",
    dateOfBirth: ""
  });

// _--------------------------------------------------------------------------Country, City , State-------------------------------------------------------------
  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const response = await getAllCountries();
    const CountriesAndIsoCode = response.map((data)=>{
      return {
        name: data.name,
        isoCode: data.isoCode
      }
    })

    setCountries(CountriesAndIsoCode)
  };


  const handleCountryChange = async(event)=>{
    const isoCode = event.target.value;
    setSelectedCountryIsoCode(isoCode);


    const filteredCountry = countries.filter((country)=>country.isoCode == isoCode);
    const countryName = filteredCountry[0].name
  
    setFormData({
      ...formData,
      country: countryName.toString(),
    });

    const getStatesWithCountry = await getStatesWithisoCode(isoCode);
    const statesAndIsoCode = getStatesWithCountry.states.map((state)=>{
      return{
        name:state.name,
        isoCode:state.isoCode
      }
    })
    setStates(statesAndIsoCode)
  };

  const handleStateChange = async(event) =>{
    const isoCode = event.target.value

    const filteredState = states.filter((state)=>state.isoCode == isoCode);
    const state = filteredState[0].name
    setFormData({
      ...formData,
      state: state,
    });

    const getCities = await getCitiesWithIsoCode(isoCode,selectedCountryIsoCode);
    setCities(getCities.cities)
  };

  // ------------------------------------------------------------------Handling Input Change-------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const ageDiff = today - birthDate;
    const calculatedAge = Math.floor(ageDiff / (365.25 * 24 * 60 * 60 * 1000)); // Approximate milliseconds in a year
    return calculatedAge;
  };

  const handleDateOfBirth = async(event) =>{
    const dateOfBirth = event.target.value;
    const age = await calculateAge(dateOfBirth);
    setAge(age)
    setFormData({
      ...formData,
      dateOfBirth: dateOfBirth
    });
  }

  // -------------------------------------------------------------------FORM Validation------------------------------------------------------------------------------------------
  
  
  const handleSubmit = async(e)=>{
 try {
    e.preventDefault();

    // Checking Everying is existed or not
    if(!formData.firstName) return toast.error('Please Enter your FirstName')
    if(!formData.lastName) return toast.error('Please Enter your LastName') 
    if(!formData.email) return toast.error('Please Enter your Email') 
    if(!formData.country) return toast.error('Please Select Your Country') 
    if(!formData.state) return toast.error('Please Select Your State')
    if(!formData.city) return toast.error('Please Select Your City')
    if(!formData.gender) return toast.error('Please Select Your Gender') 
    if(!formData.dateOfBirth) return toast.error('Please Select Your Date Of Birth') 



    const namePattern = /^[A-Za-z ]+$/;
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!formData.firstName.match(namePattern)) {
    toast.error("First Name must contain only alphabets.");
    return;
  }

  if (!formData.lastName.match(namePattern)) {
    toast.error("Last Name must contain only alphabets.");
    return;
  }

  if (!formData.email.match(emailPattern)) {
    toast.error("Invalid Email format.");
    return;
  }

  if (age<=14) {
    toast.error("You must be older than 14 years old");
    return;
  }

  if(age >130){
    toast.error("Maximum age is 130 years");
    return;
  }

   const registerUser = await RegisterDetails(formData);
   if(registerUser)return toast.success('Registration Successful')
  } catch (error) {
    toast.error('Error while Registering')
  }

  }


  return (
<>

    <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded shadow-lg mt-10">
      <h1 className="text-2xl text-center font-semibold mb-4">
        Registration form
      </h1>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.lastName}
          onChange={handleInputChange}
          />
        </div>

        {/* E-Mail */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            value={formData.email}
          onChange={handleInputChange}
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
        
          <select
            id="country"
            name="country"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            onChange={handleCountryChange}
          >
            <option selected hidden>
              Select Country
            </option>
            {countries?.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="country"
            name="country"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            onChange={handleStateChange}
          >
            <option selected hidden>
              Select State
            </option>
            {states?.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          >
            <option selected hidden>
              Select City
            </option>
            {cities?.map((city) => (
              <option key={city.isoCode} value={city.isoCode}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="mt-1">
            <input type="radio" id="male" name="gender" value="male" checked={formData.gender === "male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }/>
            <label htmlFor="male" className="mr-4">
              Male
            </label>
            <input type="radio" id="female" name="gender" value="female"  checked={formData.gender === "female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }/>
            <label htmlFor="female" className="mr-4">
              Female
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            onChange={handleDateOfBirth}
          />
        </div>

        {/* Age (Calculated automatically) */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          {age > 14 ?
            <input
            type="text"
            id="age"
            name="age"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            value={age}
            readOnly
          />
          :   <input
          type="text"
          id="age"
          name="age"
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          value='User must be more than 14 years old'
          readOnly
        />
          }
         
        </div>

        <div className="mt-4 flex justify-center space-x-3">
          <button
            type="submit"
            className="px-5 py-2 bg-green-800 text-white rounded hover:bg-green-600"
          >
            Register
          </button>

          <button
          onClick={()=>navigate('/viewDetails')}
            className="px-5 py-2 bg-blue-800 text-white rounded hover:bg-blue-600" >
            View Submits
          </button>
        </div>
        </form>
    </div>
    </>
  );
}
