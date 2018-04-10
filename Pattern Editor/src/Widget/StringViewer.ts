import { Viewer } from "./Widget";
import { HTML } from "../html";

export class StringViewer extends Viewer<string> {
    displayData(container: HTMLElement, data: string): void {
        HTML.build({
            p: container,
            ch: [data]
        });
    }
}