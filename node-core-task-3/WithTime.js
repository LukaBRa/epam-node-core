const EventEmitter = require("./EventEmitter");
module.exports = class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {

        try{
            this.emit("start");
            const startTime = process.hrtime();
            const data = await asyncFunc(...args);
            const endTime = process.hrtime(startTime);
            console.log(`Execution time: ${endTime[0]} seconds`);
        } catch (error) {
            console.log(error);
        }

    }
 }