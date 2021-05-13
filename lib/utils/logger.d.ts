interface TaskLogger {
    start(text?: string): TaskLogger;
    fail(err?: string): void;
    succeed(text?: string): void;
    end(err?: string): void;
}
declare function taskLogger(name: string): TaskLogger;
export default taskLogger;
