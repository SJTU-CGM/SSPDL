import { Controller } from "./Widget/Widget";
import { HTML } from "./html";


export interface MenuCommand {
    kind: "menu";
    firstLevel: string;
    secondLevel: string;
}


type MenuData = {
    name: string;
    content: string[];
}[];


export class Menubar extends Controller<MenuData, MenuCommand> {
    displayData(container: HTMLElement, data: { name: string; content: string[]; }[]): void {
        const buildMenu = (menu: { name: string, content: string[] }): HTMLElement => {
            const box = HTML.element("div", {}, {
                "display": "inline-block"
            });
            const first = HTML.element("div", {
                "class": "w3-button"
            }, {
                "cursor": "pointer",
                "position": "relative",
                "padding": "0.2em 1em"
            }, [menu.name]);
            const second = HTML.element("div", {}, {
                "position": "absolute",
                "display": "none",
                "background-color": "white",
                "box-shadow": "0px 8px 16px 0px rgba(0,0,0,0.2)"
            }, menu.content.map((s: string) => {
                const sec = HTML.element("div", {
                    "class": "w3-button"
                }, {
                    "display": "block",
                    "cursor": "pointer",
                    "padding": "0.2em 1em"
                }, [s]);
                sec.addEventListener("click", () => {
                    this.send({
                        kind: "menu",
                        firstLevel: menu.name,
                        secondLevel: s
                    })
                });
                return sec;
            }));
            HTML.inner(box, [first, second]);
            box.addEventListener("mouseenter", () => {
                second.style.display = "block";
            });
            box.addEventListener("mouseleave", () => {
                second.style.display = "none";
            });
            return box;
        }
        HTML.inner(container, data.map(buildMenu));
    }
}

