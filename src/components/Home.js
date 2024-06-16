import React, { useEffect, useState } from "react";
import "./Home.scss";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import AxiosHelper from "../helpers/axiosHelper";

const API = new AxiosHelper();

const Home = () => {
  const username = sessionStorage.getItem("username");
  const [dateHolder, setDateHolder] = useState(0);

  const getToday1sTS = () => {
    //the timestamp of 1st second of the day is the id
    //the browser will take care of different timezones, how comfortable...
    //so my data may not be shown in different timezone, as that countryies 1s timestamp id will be differetn
    let currTime = new Date();
    let day = currTime.getDate();
    let month = currTime.getMonth();
    let year = currTime.getFullYear();
    let Today1sTS = new Date(year, month, day).getTime();
    console.log({ Today1sTS, day, month, year });
    return Today1sTS;
  };

  useEffect(() => {
    setDateHolder(getToday1sTS());
  }, []);

  const convObjToTS = (obj) => {
    return obj ? obj.getTime() : obj;
  };

  const convTSToObj = (TS) => {
    return new Date(TS);
  };

  if (!username) {
    return null; // or a loading spinner, if you prefer
  }

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
      >
        LOGOUT
      </button>
      <div className="date-row">
        <DatePicker
          clearIcon={null}
          calendarIcon={null}
          onChange={(obj) => setDateHolder(convObjToTS(obj))}
          value={convTSToObj(dateHolder)}
        />
        {getToday1sTS() != dateHolder && (
          <button onClick={() => setDateHolder(getToday1sTS())}>Today</button>
        )}
      </div>

    </div>
  );
};

export default Home;
