import React, { useState } from "react";
import ButtonHandler from "./ButtonHandler";
import StopButton from "./StopButton";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import ProgressBar from "./ProgressBar";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [timerSets, setTimerSets] = useState({
    isFocus: true,
    isEnabled: false,
    focusBase: 25,
    focusMax: 60,
    focusMin: 5,
    focusIncrements: 5,
    focusSeconds: 25 * 60,
    breakBase: 5,
    breakMax: 15,
    breakMin: 1,
    breakIncrements: 1,
    breakSeconds: 5 * 60,
  });

  useInterval(
    () => {
      setTimerSets(() => {
        if (timerSets.isFocus) {
          if (timerSets.focusSeconds > 0) {
            return { ...timerSets, focusSeconds: timerSets.focusSeconds - 1 };
          } else {

            return {
              ...timerSets,
              focusSeconds: timerSets.focusBase * 60,
              isFocus: false,
            };
          }
        } else {
          if (timerSets.breakSeconds > 0) {
            return { ...timerSets, breakSeconds: timerSets.breakSeconds - 1 };
          } else {
            
            return {
              ...timerSets,
              breakSeconds: timerSets.breakBase * 60,
              isFocus: true,
            };
          }
        }
      });
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);

    setTimerSets({ ...timerSets, isEnabled: true });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(timerSets.focusBase)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <ButtonHandler
                type="button"
                className="btn btn-secondary"
                dataTestid="decrease-focus"
                className2="oi oi-minus"
                timerSets={timerSets}
                setTimerSets={setTimerSets}
              />

              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <ButtonHandler
                type="button"
                className="btn btn-secondary"
                dataTestid="increase-focus"
                className2="oi oi-plus"
                timerSets={timerSets}
                setTimerSets={setTimerSets}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(timerSets.breakBase)}
              </span>
              <div className="input-group-append">
                <ButtonHandler
                  type="button"
                  className="btn btn-secondary"
                  dataTestid="decrease-break"
                  className2="oi oi-minus"
                  timerSets={timerSets}
                  setTimerSets={setTimerSets}
                />
                <ButtonHandler
                  type="button"
                  className="btn btn-secondary"
                  dataTestid="increase-break"
                  className2="oi oi-plus"
                  timerSets={timerSets}
                  setTimerSets={setTimerSets}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <StopButton
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              classStop="oi oi-media-stop"
              isTimerRunning={isTimerRunning}
              timerSets={timerSets}
              setTimerSets={setTimerSets}
              playPause={playPause}
            />
          </div>
        </div>
      </div>
      <ProgressBar timerSets={timerSets} isTimerRunning={isTimerRunning} />
    </div>
  );
}

export default Pomodoro;
