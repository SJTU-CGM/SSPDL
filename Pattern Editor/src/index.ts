import { requestResource } from "./utility/requestResource";
import { ModuleViewer } from "./ModuleViewer";
import { ModelEditor } from "./ModelEditor";
import { Model } from "./SMDL/SMDL";
import { HTML } from "./html";


// requestResource("GET", "./etc/sample_module.json", "json", (mod: Model) => {
//     const editor = new ModelEditor(HTML.ref("main"));
//     editor.setData(mod);
// });


const editor = new ModelEditor(HTML.ref("main"));
editor.setData({
    namespace: {},
    root: []
});

// animation example


// const s = Snap("#example");
// const c = s.circle(50, 50, 30);
// c.drag(
//     (dx, dy, x, y, e)=>{
//         const elem = Snap.getElementByPoint(x, y);
//         if (elem !== c) {
//             elem.animate({
//                 "r": 60
//             }, 100);
//         }
//         console.log("move");
//     },
//     (x, y, e)=>{
//         console.log("started");
//     },
//     (e) => {
//         console.log(e);
//     }
// );

// const c1 = s.circle(150, 50, 30);
// c1.mouseout((e)=>{
//     c1.animate({
//         "r": 30
//     }, 100);
// })