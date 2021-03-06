"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimer = void 0;
var react_1 = require("react");
exports.useTimer = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.initialTime, initialTime = _c === void 0 ? 0 : _c, _d = _b.interval, interval = _d === void 0 ? 1000 : _d, _e = _b.step, step = _e === void 0 ? 1 : _e, _f = _b.timerType, timerType = _f === void 0 ? 'INCREMENTAL' : _f, endTime = _b.endTime, onTimeOver = _b.onTimeOver, onTimeUpdate = _b.onTimeUpdate;
    var _g = react_1.useState(initialTime), time = _g[0], setTime = _g[1];
    var _h = react_1.useState(false), isRunning = _h[0], setIsRunning = _h[1];
    var _j = react_1.useState(false), isTimeOver = _j[0], setIsTimeOver = _j[1];
    var reset = react_1.useCallback(function () {
        setIsRunning(false);
        setIsTimeOver(false);
        setTime(initialTime);
    }, [initialTime]);
    var start = react_1.useCallback(function () {
        if (isTimeOver) {
            reset();
        }
        setIsRunning(true);
    }, [reset, isTimeOver]);
    var pause = react_1.useCallback(function () {
        setIsRunning(false);
    }, []);
    react_1.useEffect(function () {
        if (typeof onTimeUpdate === 'function') {
            onTimeUpdate(time);
        }
    }, [time]);
    react_1.useEffect(function () {
        if (isRunning && time === endTime) {
            setIsRunning(false);
            setIsTimeOver(true);
            if (typeof onTimeOver === 'function') {
                onTimeOver();
            }
        }
    }, [endTime, onTimeOver, time, isRunning]);
    react_1.useEffect(function () {
        var intervalId = null;
        if (isRunning) {
            intervalId = setInterval(function () {
                setTime(function (previousTime) {
                    return timerType === 'DECREMENTAL'
                        ? previousTime - step
                        : previousTime + step;
                });
            }, interval);
        }
        else if (intervalId) {
            clearInterval(intervalId);
        }
        return function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, step, timerType, interval]);
    return { isRunning: isRunning, pause: pause, reset: reset, start: start, time: time };
};
