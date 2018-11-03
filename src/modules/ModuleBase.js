class ModuleBase {
    constructor(container, config, data) {

    }
    _init() {

    }
    _initLayout() {

    }
    _initComponents() {

    }
    _initHandler() {

    }
    _draw() {
        for (var key in this.components) {
            if (!this.components.hasOwnProperty(key)) continue;
            components[key]._draw();
        }
    }
    _updateDraw() {

    }

}