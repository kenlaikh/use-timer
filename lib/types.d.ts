export declare type TimerType = 'DECREMENTAL' | 'INCREMENTAL';
export declare type Config = {
    endTime: number | null;
    initialTime: number;
    interval: number;
    onTimeOver?: () => void;
    onTimeUpdate?: (time: number) => void;
    step: number;
    timerType: TimerType;
};
export declare type ReturnValue = {
    isRunning: boolean;
    pause: () => void;
    reset: () => void;
    start: () => void;
    time: number;
};
