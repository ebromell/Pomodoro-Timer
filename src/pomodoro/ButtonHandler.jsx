import React from "react";

function ButtonHandler({
  type,
  className,
  className2,
  dataTestid,
  timerSets,
  setTimerSets,
}) {
  const clickHandler = () => {
    if (
      dataTestid.includes("decrease-focus") &&
      timerSets.focusBase > timerSets.focusMin
    ) {
      timerSets.focusBase -= timerSets.focusIncrements;
      timerSets.focusSeconds = timerSets.focusBase * 60;
    } else if (
      dataTestid.includes("increase-focus") &&
      timerSets.focusBase < timerSets.focusMax
    ) {
      timerSets.focusBase += timerSets.focusIncrements;
      timerSets.focusSeconds = timerSets.focusBase * 60;
    } else if (
      dataTestid.includes("decrease-break") &&
      timerSets.breakBase > timerSets.breakMin
    ) {
      timerSets.breakBase -= timerSets.breakIncrements;
      timerSets.breakSeconds = timerSets.breakBase * 60;
    } else if (
      dataTestid.includes("increase-break") &&
      timerSets.breakBase < timerSets.breakMax
    ) {
      timerSets.breakBase += timerSets.breakIncrements;
      timerSets.breakSeconds = timerSets.breakBase * 60;
    }

    setTimerSets({ ...timerSets });
  };

  if (timerSets.isEnabled) {
    return (
      <button
        type={type}
        className={className}
        data-testid={dataTestid}
        onClick={clickHandler}
        disabled={true}
      >
        <span className={className2} />
      </button>
    );
  } else {
    return (
      <button
        type={type}
        className={className}
        data-testid={dataTestid}
        onClick={clickHandler}
      >
        <span className={className2} />
      </button>
    );
  }
}

export default ButtonHandler;
