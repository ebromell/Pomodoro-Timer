import React from "react";

function StopButton({
  isTimerRunning,
  playPause,
  timerSets,
  setTimerSets,
  type,
  title,
  className,
  classStop,
}) {
  const stopHandler = () => {
    console.log("sanity");
    if (isTimerRunning) playPause();
    console.log("sanity 2");
    setTimerSets({
      ...timerSets,
      focusSeconds: timerSets.focusBase * 60,
      breakSeconds: timerSets.breakBase * 60,
      isFocus: true,
      isEnabled: false,
    });
  };

  if (!timerSets.isEnabled) {
    return (
      <button
        type={type}
        className={className}
        title={title}
        onClick={stopHandler}
        disabled={true}
      >
        <span className={classStop} />
      </button>
    );
  } else {
    return (
      <button
        type={type}
        className={className}
        title={title}
        onClick={stopHandler}
      >
        <span className={classStop} />
      </button>
    );
  }
}

export default StopButton;
