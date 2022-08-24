
import { useState } from "react";
import CountDownTimer from "./CountdownTimer";

const CdTimerComp = (props) => {
  
  const [targetDate, setTargetDate] = useState();

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setTargetDate(new Date(event.target.value));
    } 
  };

  return (
      <div className="play-details">
        <div className="play-details-body">
          <div className="countdown-container">
            <form>
              <label htmlFor="countdown-date-time">
                Select a Date and Time:
              </label>
              <input
                type="datetime-local"
                id="countdown-date-time"
                name="countdown-date-time"
                onChange={handleChange}
              />
            </form>
            <p>Select a date and time in the past, present, and future
                to see how the countdown timer will display.</p>

                <CountDownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
  );
};

export default CdTimerComp;