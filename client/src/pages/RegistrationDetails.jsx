import React, { useEffect, useState } from 'react'
import { getRegistrationDetails } from '../api/ApiCalls'

export default function RegistrationDetails() {

    const [registerations,SetRegisterations] = useState([])
    useEffect(()=>{
        getDetails()
    },[])

    const getDetails = async() =>{
        const RegistrationDetails = await getRegistrationDetails();
        SetRegisterations(RegistrationDetails.registrationDetails);
    }

    const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    
    const DateDisplay = ({ date })=>{
      const formattedDate = formatDate(date);
      return <span>{formattedDate}</span>;
    }


    const calculateAge = (dateOfBirth)=>{
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
    
      // Check if the birthday has occurred this year already
      if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        return age - 1; // Subtract 1 year if the birthday hasn't occurred yet
      }
    
      return age;
    }

  return (
    <>
    {
        registerations && 
        registerations.map((data,index)=>(
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer">
        <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
          <header class="bg-blue-500 text-white py-4 text-center">
            <h1 class="text-2xl font-semibold">User Details</h1>
          </header>
      
          <div class="p-4">
            <div class="mb-3">
              <h2 class="text-lg font-semibold">Registration No.{index+1}</h2>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Firstname:</div>
              <div class="w-full md:w-1/2">{data.firstName}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Lastname:</div>
              <div class="w-full md:w-1/2">{data.lastName}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">E-Mail:</div>
              <div class="w-full md:w-1/2">{data.email}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Country:</div>
              <div class="w-full md:w-1/2">{data.country}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">State:</div>
              <div class="w-full md:w-1/2">{data.state}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">City:</div>
              <div class="w-full md:w-1/2">{data.city}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Gender:</div>
              <div class="w-full md:w-1/2">{data.gender}</div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Date of Birth:</div>
              <div class="w-full md:w-1/2"><DateDisplay date={data.dateOfBirth} /></div>
            </div>
      
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2 text-gray-600">Age: </div>
              <div class="w-full md:w-1/2">{calculateAge(data.dateOfBirth)}</div>
            </div>
      
          </div>  
        </article>
      </div>
        ))
    }
    </>
  )
}
