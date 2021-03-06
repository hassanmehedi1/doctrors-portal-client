import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = ({ date }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);

  const formattedDate = format(date, "PP");
  const {
    isLoading,
    refetch,
    error,
    data: services,
  } = useQuery(["available", formattedDate], () =>
    fetch(
      `https://still-badlands-93657.herokuapp.com/available?date=${formattedDate}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // const allServices = services;

  // useEffect(() => {
  //   fetch(`https://still-badlands-93657.herokuapp.com/available?date=${formattedDate}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setServices(data);
  //     });
  // }, [formattedDate]);

  return (
    <div>
      <h2 className="text-xl text-primary text-center">
        Available Appointments On: {format(date, "PP")}
      </h2>
      {/* {!allServices?.length && <Loading></Loading>} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transform">
        {services?.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></Service>
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointments;
