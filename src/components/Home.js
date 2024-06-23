import React, { useEffect, useState } from "react";
import "./Home.scss";
import DatePicker from "react-date-picker";
import ProgressBar from "@ramonak/react-progress-bar";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import AxiosHelper from "../helpers/axiosHelper";
import PomoUnit from "./pomoUnit";

const API = new AxiosHelper();

const Home = () => {
  const username = sessionStorage.getItem("username");
  const [dateHolder, setDateHolder] = useState(null);
  const [selected, setSelected] = useState([]);

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

  const fetchData = async (ts) => {
    if (ts !== null) {
      try {
        console.log("fetch data for the ts ", ts);
        let result = await API.get(`/pomo/get_today?timestamp=${ts}`);

        if (result.data.data[0]?.selected)
          setSelected(result.data.data[0].selected);
        else setSelected([]);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  };

  useEffect(() => {
    setDateHolder(getToday1sTS());
  }, []);

  useEffect(() => {
    fetchData(dateHolder);
  }, [dateHolder]);

  const convObjToTS = (obj) => {
    return obj ? obj.getTime() : obj;
  };

  const convTSToObj = (TS) => {
    return new Date(TS);
  };

  // if (!username) {
  //   return null; // or a loading spinner, if you prefer
  // }

  return (
    <div className="home-container">
      <div className="head-row">
        <h2>Home Page</h2>
        <button
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          LOGOUT
        </button>
      </div>

      <div className="date-row">
        <DatePicker
          clearIcon={null}
          calendarIcon={null}
          onChange={(obj) => {
            setDateHolder(convObjToTS(obj));
            fetchData(convObjToTS(obj));
          }}
          value={convTSToObj(dateHolder)}
        />
        {getToday1sTS() != dateHolder && (
          <button onClick={() => setDateHolder(getToday1sTS())}>Today</button>
        )}
      </div>
      <div className="pomo-row">
        <PomoUnit
          key={0}
          pomoIndex={0}
          value={selected}
          callback={fetchData}
          timestamp={dateHolder}
        />
        <PomoUnit
          key={1}
          pomoIndex={1}
          value={selected}
          callback={fetchData}
          timestamp={dateHolder}
        />
        <PomoUnit
          key={2}
          pomoIndex={2}
          value={selected}
          callback={fetchData}
          timestamp={dateHolder}
        />
        <PomoUnit
          key={3}
          pomoIndex={3}
          value={selected}
          callback={fetchData}
          timestamp={dateHolder}
        />
      </div>
      <div className="percentage-completed">
        {/* <p>{selected.length * 100 / 32} % </p> */}
        <ProgressBar completed={(selected.length * 100) / 32} />
      </div>
    </div>
  );
};

export default Home;
