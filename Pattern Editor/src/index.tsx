import { ModelEditor } from "./Components/ModelEditor";
import * as JSXFactory from "./JSX/HTMLFactory";


const e = <div />


const editor = new ModelEditor();
editor.initData({
    alphabet: ["A", 'C', 'G', 'T'],
    namespace: {},
    background: { "A": 0.25, 'C': 0.25, 'G': 0.25, 'T': 0.25 },
    root: []
}, undefined);
document.body.appendChild(editor.getDOM());
document.body.style.padding = "0";