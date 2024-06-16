import { useEffect, useState } from "react";
import "./pomoUnit.scss";
import AxiosHelper from "../helpers/axiosHelper";
const API = new AxiosHelper();
const PomoUnit = ({ pomoIndex = 0, callback=(value)=>{console.log(value)}, value=[], timestamp }) => {
  const noOfEle = 4;
  const [completed, setCompleted] = useState([]);
  const [userInteraction, setUserInteraction] = useState(false);

  useEffect(()=>{
    setCompleted([...value])
  },[value])

//   useEffect(()=>{
    
//     if(userInteraction){
//     //    callback(completed.sort());
//        await API.post({timestamp,                                                                                      })
//     }
//   },[completed , userInteraction])

  const getId = (type, index) => {
    // index = index+1;// ( start counting from 1)
    //0-1, 1-2, 2-4, 3-6
    let localIndex;
    if (type == "task") {
      localIndex = index * 2 + 1;
    } else {
      localIndex = index * 2 + 2;
    }
    return localIndex + (pomoIndex * 8)
  };
  const handleClick = async(type, index) => {
    setUserInteraction(true);
    let convert_id = getId(type, index);
    if (completed.includes(convert_id)) {
      //already selected, now nremov
      await API.post('/pomo/set_today', {timestamp, selected_no:convert_id, state:false})
    } else {
      //add the item
      await API.post('/pomo/set_today', {timestamp, selected_no:convert_id, state:true})
    }
    callback(timestamp);
  };

  const getStyling = (type, index) => {
    let convert_id = getId(type, index);
    if (completed.includes(convert_id)) {
      return { backgroundColor: "black" };
    } else {
      return { backgroundColor: "bisque" };
    }
  };
  return (
    <div className="Pomo-unit-container">
      {[...Array(noOfEle)].map((x, index) => (
        <div className="PomoRow" key={index}>
          <div
            className="Task"
            style={getStyling("task", index)}
            onClick={() => {
              handleClick("task", index);
            }}
          ></div>
          <div
            className="Rest"
            style={getStyling("rest", index)}
            onClick={() => {
              handleClick("rest", index);
            }}
          >
            <div className="LastBoxMask"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PomoUnit;
