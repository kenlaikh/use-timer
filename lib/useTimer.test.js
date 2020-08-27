"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jsdom-global/register");
var react_1 = __importDefault(require("react"));
var useTimer_1 = require("./useTimer");
var test_utils_1 = require("react-dom/test-utils");
var react_2 = require("@testing-library/react");
jest.useFakeTimers();
describe('Start', function () {
    it('should start timer', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer(), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('5');
    });
    it('should start timer with an initial time of 10', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                initialTime: 10,
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('15');
    });
    it('should start decremental timer with an initial time of 100', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                initialTime: 100,
                timerType: 'DECREMENTAL',
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(20000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('80');
    });
    it('should update time with an interval of 2000 milliseconds', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                interval: 2000,
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(10000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('5');
    });
});
describe('Stop', function () {
    it('should stop incremental timer when time is over', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                endTime: 25,
                initialTime: 5,
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(40000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('25');
    });
    it('should stop decremental timer when time is over', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                endTime: 10,
                initialTime: 30,
                timerType: 'DECREMENTAL',
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(30000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('10');
    });
});
describe('Pause', function () {
    it('should pause timer', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer(), time = _a.time, start = _a.start, pause = _a.pause;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-testid": "start", onClick: start }, "Start"),
                react_1.default.createElement("button", { "data-testid": "pause", onClick: pause }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var getByTestId = react_2.render(react_1.default.createElement(Component, null)).getByTestId;
        // When
        react_2.fireEvent.click(getByTestId('start'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        react_2.fireEvent.click(getByTestId('pause'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('5');
    });
    it('should pause timer with an end time', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                endTime: 5,
            }), time = _a.time, start = _a.start, pause = _a.pause;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-testid": "start", onClick: start }, "Start"),
                react_1.default.createElement("button", { "data-testid": "pause", onClick: pause }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var getByTestId = react_2.render(react_1.default.createElement(Component, null)).getByTestId;
        var startButton = getByTestId('start');
        var pauseButton = getByTestId('pause');
        var time = getByTestId('time');
        // When
        react_2.fireEvent.click(startButton);
        test_utils_1.act(function () {
            jest.advanceTimersByTime(3000);
        });
        react_2.fireEvent.click(pauseButton);
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        react_2.fireEvent.click(startButton);
        // Then
        expect(time.textContent).toBe('3');
        test_utils_1.act(function () {
            jest.advanceTimersByTime(3000);
        });
        expect(time.textContent).toBe('5');
    });
});
describe('Reset', function () {
    it('should reset timer to default initial time', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer(), time = _a.time, start = _a.start, reset = _a.reset;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-testid": "start", onClick: start }, "Start"),
                react_1.default.createElement("button", { "data-testid": "reset", onClick: reset }, "Reset"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var getByTestId = react_2.render(react_1.default.createElement(Component, null)).getByTestId;
        var startButton = getByTestId('start');
        var resetButton = getByTestId('reset');
        var time = getByTestId('time');
        // When
        react_2.fireEvent.click(startButton);
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        react_2.fireEvent.click(resetButton);
        // Then
        expect(time.textContent).toBe('0');
    });
    it('should reset timer to default initial time after restart', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                endTime: 10,
            }), time = _a.time, start = _a.start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var _a = react_2.render(react_1.default.createElement(Component, null)), getByRole = _a.getByRole, getByTestId = _a.getByTestId;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(10000);
        });
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        // Then
        expect(getByTestId('time').textContent).toBe('5');
    });
    it('should reset timer to initial time of 20', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                initialTime: 20,
            }), time = _a.time, start = _a.start, reset = _a.reset;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-testid": "start", onClick: start }, "Start"),
                react_1.default.createElement("button", { "data-testid": "reset", onClick: reset }, "Reset"),
                react_1.default.createElement("p", { "data-testid": "time" }, time)));
        };
        var getByTestId = react_2.render(react_1.default.createElement(Component, null)).getByTestId;
        // When
        react_2.fireEvent.click(getByTestId('start'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(5000);
        });
        react_2.fireEvent.click(getByTestId('reset'));
        // Then
        expect(getByTestId('time').textContent).toBe('20');
    });
});
describe('State and callbacks', function () {
    it('should display "Running" text when timer is running', function () {
        // Given
        var Component = function () {
            var _a = useTimer_1.useTimer({
                initialTime: 20,
            }), isRunning = _a.isRunning, start = _a.start, pause = _a.pause, reset = _a.reset;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-testid": "start", onClick: start }, "Start"),
                react_1.default.createElement("button", { "data-testid": "pause", onClick: pause }, "Pause"),
                react_1.default.createElement("button", { "data-testid": "reset", onClick: reset }, "Reset"),
                react_1.default.createElement("p", { "data-testid": "status" }, isRunning ? 'Running' : 'Not running')));
        };
        var getByTestId = react_2.render(react_1.default.createElement(Component, null)).getByTestId;
        var startButton = getByTestId('start');
        var pauseButton = getByTestId('pause');
        var resetButton = getByTestId('reset');
        var statusBlock = getByTestId('status');
        // When
        react_2.fireEvent.click(startButton);
        // Then
        expect(statusBlock.textContent).toBe('Running');
        // When
        react_2.fireEvent.click(pauseButton);
        // Then
        expect(statusBlock.textContent).toBe('Not running');
        // When
        react_2.fireEvent.click(startButton);
        // Then
        expect(statusBlock.textContent).toBe('Running');
        // When
        react_2.fireEvent.click(resetButton);
        // Then
        expect(statusBlock.textContent).toBe('Not running');
    });
    it('should call callback function when time is over', function () {
        // Given
        var onTimeOver = jest.fn();
        var Component = function () {
            var start = useTimer_1.useTimer({
                endTime: 30,
                initialTime: 0,
                onTimeOver: onTimeOver,
            }).start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start")));
        };
        var getByRole = react_2.render(react_1.default.createElement(Component, null)).getByRole;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(30000);
        });
        // Then
        expect(onTimeOver).toHaveBeenCalled();
    });
    it('should call callback function when time is updated', function () {
        // Given
        var onTimeUpdate = jest.fn();
        var Component = function () {
            var start = useTimer_1.useTimer({
                endTime: 10,
                initialTime: 0,
                onTimeUpdate: onTimeUpdate,
            }).start;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: start }, "Start")));
        };
        var getByRole = react_2.render(react_1.default.createElement(Component, null)).getByRole;
        // When
        react_2.fireEvent.click(getByRole('button'));
        test_utils_1.act(function () {
            jest.advanceTimersByTime(10000);
        });
        // Then
        expect(onTimeUpdate).toHaveBeenCalledTimes(11);
        expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
        expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
    });
});
