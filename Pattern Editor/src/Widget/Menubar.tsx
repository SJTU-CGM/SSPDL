import { Viewer, Controller } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";
import { Builder } from "../JSX/HTMLFactory";


export interface MenubarCommand {
    kind: "menubar";
    firstLevel: string;
    secondLevel: string;
}


type MenubarData = {
    name: string;
    content: string[];
}[];


export class Menubar extends Controller<MenubarData, MenubarCommand> {
    makeContainer(): HTMLElement {
        return (
            <div style={{
                display: "flex",
                "flex-direction": "row",
                "padding": "0",
                "margin": "0",
                "width": "100%",
                "background-color": "lightgrey"
            }}></div>
        )
    }
    displayData(data: { name: string; content: string[]; }[]): void {
        interface MenubarItemProps {
            name: string;
            content: string;
        }
        const Button = (prop: { firstLevel: string; secondLevel: string; }) => {
            // const btn = (
            //     <div style={{
            //         "display": "block",
            //         "cursor": "pointer",
            //         "padding": "0.2em 1em"
            //     }}>{prop.secondLevel}</div>
            // );
            const btn = <button>{prop.secondLevel}</button>;
            btn.addEventListener("click", () => {
                this.send({
                    kind: "menubar",
                    firstLevel: prop.firstLevel,
                    secondLevel: prop.secondLevel
                });
            });
            return btn;
        }
        const MenubarItem: Builder<{ name: string; content: string[] }> = (prop) => {
            let dropdown: HTMLElement;
            const item = (
                <div style={{ "display": "inline" }}>
                    <div style={{
                        "cursor": "pointer",
                        "position": "relative",
                        "padding-left": "1em",
                        "padding-right": "1em",
                        "padding-top": "0.2em",
                        "padding-bottom": "0.2em",
                        "background-color": "lightgrey"
                    }}>
                        {prop.name}
                    </div>
                    {
                        dropdown = (
                            <div style={{
                                "flex-direction": "column",
                                "position": "absolute",
                                "display": "none",
                                "background-color": "white",
                                "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"
                            }}>
                                {
                                    prop.content.map((s: string) => (
                                        <Button firstLevel={prop.name} secondLevel={s}></Button>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            )
            item.addEventListener("mouseenter", () => {
                dropdown.style.display = "flex";
            });
            item.addEventListener("mouseleave", () => {
                dropdown.style.display = "none";
            });
            return item;
        }
        const container = this.getDOM();
        container.innerHTML = "";
        for (const m of data) {
            container.appendChild(<MenubarItem name={m.name} content={m.content} />);
        }
    }
}

