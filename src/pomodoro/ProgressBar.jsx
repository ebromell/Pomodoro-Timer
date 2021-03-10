import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function ProgressBar({ timerSets, isTimerRunning }) {
  if (timerSets.isEnabled === true) {
    let focusBar =
      ((timerSets.focusBase * 60 - timerSets.focusSeconds) /
        (timerSets.focusBase * 60)) *
      100;
    let breakBar =
      ((timerSets.breakBase * 60 - timerSets.breakSeconds) /
        (timerSets.breakBase * 60)) *
      100;

      if (timerSets.isFocus === true) {
        return (
          <div>
            <div className="row mb-2">
              <div className="col">
                <h2 data-testid="session-title">
                  Focusing for {minutesToDuration(timerSets.focusBase)} minutes
                </h2>
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(timerSets.focusSeconds)} remaining
                </p>
              </div>
            </div>
            <div>{
              timerSets.isEnabled === true && isTimerRunning === false ?
                (<h4>PAUSED</h4>) : null
            }</div>
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={focusBar} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{ width: `${focusBar}%` }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="row mb-2">
              <div className="col">
                <h2 data-testid="session-title">
                  On Break for {minutesToDuration(timerSets.breakBase)} minutes
                </h2>
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(timerSets.breakSeconds)} remaining
                </p>
              </div>
            </div>
            <div>{
              timerSets.isEnabled === true && isTimerRunning === false ?
                (<h4>PAUSED</h4>) : null
            }</div>
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={breakBar} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{ width: `${breakBar}%` }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }


  export default ProgressBar;
