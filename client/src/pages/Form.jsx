import React, { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: 'male',
    dob: '',
    age: '',
  });


  const countries = ['USA', 'Canada', 'UK'];
  const states = {
    USA: ['New York', 'California', 'Texas'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    UK: ['London', 'Manchester', 'Birmingham'],
  };
  const cities = {
    'New York': ['New York City', 'Buffalo', 'Rochester'],
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    // Define cities for other states and countries as needed
  };



  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-lg mt-10">
      <h1 className="text-2xl text-center font-semibold mb-4">Registration form</h1>
      <form>
      
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* E-Mail */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>



        {/* Country */}
        <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country"
          name="country"
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option selected hidden>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <select
          id="state"
          name="state"
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="" hidden>Select State</option>
          {formData.country &&
            states[formData.country].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <select
          id="city"
          name="city"
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option selected hidden>Select City</option>
          {formData.state &&
            cities[formData.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="mt-1">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
            <label htmlFor="female" className="mr-4">
              Female
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              required
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Age (Calculated automatically) */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            readOnly
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}