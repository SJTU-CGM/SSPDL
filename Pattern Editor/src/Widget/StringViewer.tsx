import { Viewer } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


export class StringViewer extends Viewer<string> {
    protected displayData(data: string): void {
        JSXFactory.render(this.getDOM(), (
            <span>{data}</span>
        ))
    }
}