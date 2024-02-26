module.exports = class EventEmitter {

    listeners = [];

    constructor(){};

    addListener(eventName, fn) {
        this.listeners.push({ eventName, fn, statement: "on" });
    }

    on(eventName, fn) {
        this.listeners.push({ eventName, fn, statement: "on" });
    }

    removeListener(eventName, fn) { 
        this.listeners.filter(event => JSON.stringify(event) === JSON.stringify({ eventName, fn, statement: "on" }));
    }

    off(eventName, fn) { 
        this.listeners.filter(event => JSON.stringify(event) === JSON.stringify({ eventName, fn, statement: "on" }));
    }

    once(eventName, fn) {
        this.listeners.push({ eventName, fn, statement: "once" });
    }

    emit(eventName, ...args) {
        this.listeners.forEach(listener => {
            if(listener.eventName === eventName){
                listener.fn(...args);
                if(listener.statement === "once"){
                    this.listeners = this.listeners.filter(tempListener => JSON.stringify(tempListener) !== JSON.stringify(listener));
                }
            }
        })
    }

    listenerCount(eventName) {
        return this.listeners.reduce((count, listener) => {
            return listener.eventName === eventName ? count + 1 : count;
        }, 0);
    }

    rawListeners(eventName) {
        return this.listeners.filter(listener => listener.eventName === eventName);
    }

}