class builderBase {
    constructor() {
        this.config = {};
    }
    set_or_get(callerArguments) {
        console.log(callerArguments.callee.caller.name)
        return this;
    }
    build() {
        return this.config;
    }
}

class xyzBuilder extends builderBase {
    constructor() {
        super();
    }
    x(_) {
        const a = arguments.callee;
        console.log(a)
        return this.set_or_get(arguments)
    }
    z(_) {
        return this.set_or_get(arguments)
    }
    y(_) {
        return this.set_or_get(arguments)
    }
}
const config = new xyzBuilder()
    .x("x")
    .y("y")
    .z("z")
    .build();

console.log(JSON.stringify(config));



class BaseBuilder() {
    constructor() {
        this.config = {};
    }
    _set() {

    }
    data(value) {
        this._set(value);
        return this;
    }
    colorMap(value) {
        this._set(value);
        return this;
    }
    opacity(value) {
        this._set(value);
        return this;
    }
    container(value) {
        this._set(value);
        return this;
    }
    width(value) {
        this._set(value);
        return this;
    }
    height(value) {
        this._set(value);
        return this;
    }
    x(value) {
        this._set(value);
        return this;
    }
    y(value) {
        this._set(value);
        return this;
    }
    build() {
        return this.config;
    }
}