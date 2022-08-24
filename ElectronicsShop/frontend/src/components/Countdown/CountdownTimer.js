import "./datetime.css";
import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "./hooks/useCountdown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <p className="text-danger text-bold">Auction End Timer</p>
      <a className="countdown-link" >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p className="dott">:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p className="dott">:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p className="dott">:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};


const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds < 0) {
    return <ExpiredNotice />;
  } 
  else {
    return (
      
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountDownTimer;