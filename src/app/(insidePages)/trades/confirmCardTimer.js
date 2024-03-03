import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import {msToTime} from '@/services/formatTime';

const ConfirmCardTimer = ({ timeCodeSent }) => {
  
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    //console.log(timeCodeSent)
    const interval = setInterval( ()=>{
      setCurrentTime(new Date().getTime())
    }, 1000)
    return ()=> clearInterval(interval)
  });

  const timeLeft = ()=>{
    const startTime = new Date(timeCodeSent).getTime();
    let timeleft = (startTime + 10800000) - currentTime;
    if(timeleft > 0){
      return msToTime(timeleft)
    }
    return `00:00:00`
  }

  return (
    <div>
      <Tooltip title={`Buyer has ${timeLeft()} to confirm card`} arrow>
        <button className="btn btn-outline-danger">{timeLeft()}</button>
      </Tooltip>
    </div>
  )
}

export default ConfirmCardTimer;