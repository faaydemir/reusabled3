const EventTypes = {
    onMouseOver: "onMouseOver",
    onMouseOut: "onMouseOut",
    click: "click",
    verticalzoom: "verticalzoom",
    horizontalzoom: "horizontalzoom",
}

var Event = function(_name, _value, _source) {
    if (arguments.length == 3) {
        this.name = _name;
        this.value = _value;
        this.source = _source;
    } else {
        this.name = "";
        this.value = "";
        this.source = "";
    }
}
class EventBus {
    constructor() {
        this.observers = {};
        this.unsubscribe = function(eventName, eventListener) {
            if (!(this.observers[eventName]))
                return;

            var index = this.observers[eventName].indexOf(eventListener);
            if (index > -1) {
                this.observers[eventName].splice(index, 1);
            }
        }
        this.subscribe = function(eventName, eventListener) {
            if (!(this.observers[eventName]))
                this.observers[eventName] = [];

            this.observers[eventName].push(eventListener)
        };
        this.notify = function(name, source, args) {
            if (this.observers[name])
                for (var i = 0; i < this.observers[name].length; i++) {
                    this.observers[name][i](name, source, args)
                }
        };
    }
}