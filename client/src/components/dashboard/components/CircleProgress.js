import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleProgress = ({ value, maxValue, text }) => {
    return <CircularProgressbar value={value} maxValue={maxValue} text={`${text}%`} styles={buildStyles({
        textColor: "red",
        pathColor: "turquoise",
        trailColor: "gold"
    })} />;
}

export default CircleProgress;