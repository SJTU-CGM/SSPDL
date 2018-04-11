import { Editor } from "./Widget/Widget";
import { ElementDef } from "./SMDL/SMDL";
import { HTML } from "./html";
import { StringEditor } from "./Widget/StringEditor";
import { MotifEditor, GMotifEditor } from "./MotifEditor";
import { SpacerEditor } from "./SpacerEditor";


type NamedElementDef = {
    name: string;
    def: ElementDef;
}

export class ElementEditor extends Editor<NamedElementDef> {
    private nameEd: StringEditor;
    private gmotifEd: GMotifEditor;
    private motifEd: MotifEditor;
    private spacerEd: SpacerEditor;
    constructor(container: HTMLElement) {
        super(container);
        this.nameEd = new StringEditor(HTML.box());
        this.motifEd = new MotifEditor(HTML.box());
        this.gmotifEd = new GMotifEditor(HTML.box());
        this.spacerEd = new SpacerEditor(HTML.box());
        this.gmotifEd.getDOM().style.display = "none";
        this.motifEd.getDOM().style.display = "none";
        this.spacerEd.getDOM().style.display = "none";
        HTML.inner(container, [
            this.nameEd.getDOM(), this.motifEd.getDOM(), this.gmotifEd.getDOM(), this.spacerEd.getDOM()
        ]);
    }
    getData(): NamedElementDef {
        const getDef = () => {
            switch (this.data.def.kind) {
                case "motif": {
                    return Object.assign(this.motifEd.getData(), { kind: "motif" } as { kind: "motif" });
                }
                case "g-motif": {
                    return Object.assign(this.gmotifEd.getData(), { kind: "g-motif" } as { kind: "g-motif" });
                }
                case "spacer":{
                    return Object.assign(this.spacerEd.getData(), { kind: "spacer" } as { kind: "spacer" });
                }
            }
        }
        console.log(this.data);
        return {
            name: this.nameEd.getData(),
            def: getDef()
        };
    }
    displayData(container: HTMLElement, data: { name: string; def: ElementDef; }): void {
        this.nameEd.setData({
            label: "Name",
            content: data.name
        });
        const def = data.def;
        switch (def.kind) {
            case "motif": {
                this.motifEd.getDOM().style.display = "unset";
                this.gmotifEd.getDOM().style.display = "none";
                this.spacerEd.getDOM().style.display = "none";
                this.motifEd.setData({
                    color: def.color,
                    matrix: def.matrix
                });
                return;
            }
            case "g-motif": {
                this.motifEd.getDOM().style.display = "none";
                this.gmotifEd.getDOM().style.display = "unset";
                this.spacerEd.getDOM().style.display = "none";
                this.gmotifEd.setData({
                    distribution: def.distribution,
                    color: def.color,
                    matrix: def.matrix
                });
                return;
            }
            case "spacer": {
                // spacer
                this.motifEd.getDOM().style.display = "none";
                this.gmotifEd.getDOM().style.display = "none";
                this.spacerEd.getDOM().style.display = "unset";
                this.spacerEd.setData({
                    distribution: def.distribution
                });
                return;
            }
        }
    }
}