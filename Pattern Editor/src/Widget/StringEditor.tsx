import { Editor } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


export class StringEditor extends Editor<string, void> {
    makeContainer() {
        return <input type="text" />;
    }
    init() {
        super.init()
        this.getDOM().addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data: string): void {
        (this.getDOM() as HTMLInputElement).value = data;
    }
    getMajorData(): string {
        return (this.getDOM() as HTMLInputElement).value;
    }
}