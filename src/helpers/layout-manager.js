// // function LayoutService(container, components, width, height) {

// //     let layouts = {}
// //     let containerSize = calculatedLayout(container, width, height)

// //     this.relativePositioning = "relative";
// //     this.absolutePositioning = "absolute";

// //     for (let key in components) {
// //         if (!components.hasOwnProperty(key)) continue;
// //         let componentLayout = {}
// //         let layoutConfig = components[key].layoutConfig

// //         if (layout.position === this.relativePositioning) {
// //             let width = layoutConfig.width - layoutConfig.margin.left + layoutConfig.margin.right;
// //             let componentSize = layoutConfig(container, layoutConfig.width, layoutConfig.height);

// //         } else {

// //         }

// //         if (IsAlignLeft(componentAlign)) {

// //         } else if (IsAlignRight(componentAlign)) {

// //         }

// //         if (IsAlignTop(componentAlign)) {

// //         } else if (IsAlignBotton(componentAlign)) {

// //         }
// //     }

// //     return layouts;

// //     function OnResize() {

// //     }
// // }
// _initLayout() {
//     let relativePositioning = "relative";
//     let absolutePositioning = "absolute";
//     let leftOffset = 0;
//     let rightOffset = 0;
//     let topOffset = 0;
//     let bottomOffset = 0;

//     let left = [];
//     let right = [];
//     let top = [];
//     let bottom = [];

//     for (let componentName in this._defaultConfig.component) {

//         if (!this.component.hasOwnProperty(key)) continue;
//         let layout = this.component[key].layout;
//         if (layout.position === relativePositioning) {
//             if (layout.align.indexof("left") != -1) {
//                 left.push(this.component[key]);

//             } else if (layout.align.indexof("right") != -1) {
//                 right.push(this.component[key]);
//             }

//             if (layout.align.indexof("top") != -1) {
//                 top.push(this.component[key]);
//             } else if (layout.align.indexof("bottom") != -1) {
//                 bottom.push(this.component[key]);
//             }
//             for (let l in left) {

//             }
//             for (let l in right) {

//             }
//             for (let l in top) {

//             }
//             for (let l in bottom) {

//             }
//         }

//     }
// }