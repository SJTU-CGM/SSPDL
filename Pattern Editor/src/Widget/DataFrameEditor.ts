// import { Editor } from "./Widget";
// import { HTML } from "../html";


// interface Record {
//     [key: string]: any;
// }


// interface DataFrame<R extends Record> {
//     fieldNames: (keyof R)[];
//     records: R[];
// }


// export class DataFrameEditor<R extends Record, K extends keyof R> extends Editor<DataFrame<R>> {
//     protected fieldEditors: Map<key: string] : new (c: HTMLElement, d: Record[K]) => Editor<Record[K]>}
//     constructor(container: HTMLElement, data: DataFrame<R>, fieldEditors: Map<K, new (c: HTMLElement, d: Record[K]) => Editor<Record[K]>>) {
//         super(container, data);
//         this.fieldEditors = fieldEditors;
//     }
//     displayData(container: HTMLElement, data: DataFrame<R>): void {
//         const header = HTML.element("tr", {}, {}, data.fieldNames.map((fn)=>HTML.element("th",{},{},[fn])));
//         const contentRows = data.records.map((r)=>{
//             return HTML.element("tr", {}, {}, [
//                 ...data.fieldNames.map((fn)=>{
//                     const Ed = this.foo[fn];
//                     const e = HTML.element("td");
//                     new Ed(e, r[fn]);
//                     return e;
//                 })
//             ]);
//         })
//     }
// }