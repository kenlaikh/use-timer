import "jsdom-global/register";
import Enzyme from "enzyme";
import React from "react";
import { useTimer } from "./useTimer";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

it("should start timer", () => {
  const Component = () => {
    const { time, start } = useTimer();
    return (
      <div>
        <button onClick={start}>Start</button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("5");
});

it("should start timer with an initial time of 10", () => {
  const Component = () => {
    const { time, start } = useTimer({
      initialTime: 10
    });
    return (
      <div>
        <button onClick={start}>Start</button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("15");
});

it("should update time with an interval of 2000 milliseconds", () => {
  const Component = () => {
    const { time, start } = useTimer({
      interval: 2000
    });
    return (
      <div>
        <button onClick={start}>Start</button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(10000);
  });

  expect(time.text()).toBe("5");
});

it("should pause timer", () => {
  const Component = () => {
    const { time, start, pause } = useTimer();
    return (
      <div>
        <button id="start" onClick={start}>
          Start
        </button>
        <button id="pause" onClick={pause}>
          Start
        </button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const startButton = wrapper.find("#start");
  const pauseButton = wrapper.find("#pause");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  pauseButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("5");
});

it("should reset timer", () => {
  const Component = () => {
    const { time, start, pause, reset } = useTimer();
    return (
      <div>
        <button id="start" onClick={start}>
          Start
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const startButton = wrapper.find("#start");
  const resetButton = wrapper.find("#reset");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  resetButton.simulate("click");

  expect(time.text()).toBe("0");
});
