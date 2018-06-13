import * as JSXFactory from "../JSX/HTMLFactory";

import { Viewer, Controller, Controllee } from "../Widget/Widget";
import { IndexCmd } from "./IndexViewer";


export type Definition = _Definition | null
interface _Definition {
    name: string;
    useless: boolean;
}


export type ChangeDefinitionCmd = DeleteDefCmd | RenameDefCmd;
interface DeleteDefCmd {
    kind: "delete-def"
    name: string
}
interface RenameDefCmd {
    kind: 'rename-def'
    oldName: string
    newName: string
}


export class DefinitionViewer extends Controller<Definition, ChangeDefinitionCmd> {
    protected displayData(data: Definition): void {
        if (data === null) {
            JSXFactory.render(this.getDOM())
        } else {
            const renameButton = <button style={{ "margin-right": "1em" }}>Rename</button>
            const deleteButton = <button>Delete</button> as HTMLButtonElement;
            if (data.useless) {
                deleteButton.disabled = true
                deleteButton.title = "You cannot delete this element, because it's currently in use."
            }
            renameButton.addEventListener("click", () => {
                const newName = prompt("A new name")
                if (newName !== null && newName.length > 0) {
                    this.send({
                        kind: "rename-def",
                        oldName: data.name,
                        newName: newName
                    })
                }
            })
            deleteButton.addEventListener("click", () => {
                this.send({
                    kind: "delete-def",
                    name: data.name
                })
            })
            JSXFactory.render(this.getDOM(),
                <div
                    style={{
                        "display": "flex", "flex-direction": "row", "border-bottom": "1px solid grey",
                        "padding-top": "0.5ex",
                        "padding-bottom": "0.5ex"
                    }}
                >
                    <span
                        style={{
                            "flex-grow": "1",
                            "display": "flex",
                            "align-items": "center",
                            "justify-content": "center",
                            "font-weight": "bold"
                        }}
                    >
                        {data.name}
                    </span>
                    {renameButton}
                    {deleteButton}
                </div>
            )
        }
    }
}