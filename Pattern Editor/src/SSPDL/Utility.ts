import { QuasiModule, QuasiModuleItem, Element, QuasiAlternation, QuasiRepetition } from "./SSPDL";

export { StandardRider, Rider, Path };


type Path = number[];
type Node<E> = ModuleNode<E> | ModuleItemNode<E>;
interface ModuleNode<E> {
    kind: "module";
    module: QuasiModule<E>;
};
interface ModuleItemNode<E> {
    kind: "item";
    item: QuasiModuleItem<E>;
}


class Rider<E> {
    private root: QuasiModule<E>;
    node: Node<E>;
    path: Path;
    constructor(root: QuasiModule<E>, path: Path = [], node?: Node<E>) {
        this.root = root;
        if (node === undefined) {
            this.path = [];
            this.node = { kind: "module", module: root };
            this.go(path);
        } else {
            this.path = path;
            this.node = node;
        }
    }
    copy(): Rider<E> {
        return new Rider<E>(this.root, this.path);
    }
    up(): void {
        this.go(this.path.slice(0, this.path.length-1));
    }
    go(path: Path): void {
        this.node = travel({
            kind: "module",
            module: this.root
        }, path);
        this.path = path;
    }
    getPath(): Path {
        return this.path;
    }
    getNodeKind(): "module" | "item" {
        return this.node.kind;
    }
    getModule(): QuasiModule<E> {
        if (this.node.kind == "module") {
            return this.node.module;
        }
        else {
            throw new Error("not a module");
        }
    }
    getItem(): QuasiModuleItem<E> {
        if (this.node.kind == "item") {
            return this.node.item;
        }
        else {
            throw new Error("not an item");
        }
    }
    getAlternation(): QuasiAlternation<E> {
        const item = this.getItem();
        if (item.kind === "alternation") {
            return item;
        } else {
            throw new Error("not an alternation");
        }
    }
    getRepetition(): QuasiRepetition<E> {
        const item = this.getItem();
        if (item.kind === "repetition") {
            return item;
        } else {
            throw new Error("not a rep");
        }
    }
    getItemKind(): "element" | "alternation" | "repetition" {
        return this.getItem().kind;
    }
    isElement(): boolean {
        return this.getNodeKind() == "item" && this.getItem().kind == "element";
    }
    getElementContent(): E {
        const it = this.getItem();
        if (it.kind == "element") {
            return it;
        } else {
            throw new Error();
        }
    }
    getChildRiders(): Rider<E>[] {
        const node = this.node;
        if (node.kind == "module") {
            const m = node.module;
            let n = 0;
            return m.map((item, index) => {
                const node: ModuleItemNode<E> = { kind: "item", item: item };
                const path = this.path.concat([index]);
                return new Rider<E>(this.root, path, node);
            })
        } else if (node.kind == "item") {
            const t = node.item;
            if (t.kind == "element") {
                throw new Error("elementary node has no child node");
            }
            else if (t.kind == "alternation") {
                return t.psubs.map((ps, i) => {
                    const m = ps.mod;
                    return new Rider<E>(this.root, this.path.concat([i]), { kind: "module", module: m });
                });
            }
            else if (t.kind == "repetition") {
                return [
                    new Rider(this.root, this.path.concat([0]), { kind: "module", module: t.sub })
                ];
            } else {
                throw new Error("bad item node");
            }
        } else {
            throw new Error("bad node");
        }
    }
}


class StandardRider extends Rider<Element> { };


function travel<E>(node: Node<E>, path: Path): Node<E> {
    for (let i = 0; i < path.length; i++) {
        const n = path[i];
        if (node.kind == "module") {
            const m = node.module;
            node = { kind: "item", item: m[n] };
            continue;
        } else if (node.kind == "item") {
            const t = node.item;
            switch (t.kind) {
                case "element": {
                    throw new Error("elementary node has no child node");
                }
                case "alternation": {
                    node = { kind: "module", module: t.psubs[n].mod };
                    continue;
                }
                case "repetition": {
                    if (n === 0) {
                        node = { kind: "module", module: t.sub };
                        continue
                    } else {
                        throw new Error("bad index");
                    }
                }
            }
        } else {
            throw new Error("bad node");
        }
    }
    return node;
}


export function transformModule<E1, E2>(m: QuasiModule<E1>, p: (e: E1) => E2) {
    return m.map((t): QuasiModuleItem<E2> => {
        switch (t.kind) {
            case "element": {
                const sign: { kind: "element" } = { kind: "element" };
                return Object.assign(p(t), sign);
            }
            case "alternation": {
                return {
                    kind: "alternation",
                    psubs: t.psubs.map((ps) => {
                        return {
                            prob: ps.prob,
                            mod: transformModule<E1, E2>(ps.mod, p)
                        }
                    })
                };
            }
            case "repetition": {
                return {
                    kind: "repetition",
                    prob: t.prob,
                    sub: transformModule<E1, E2>(t.sub, p)
                };
            }
        }
    })
}


export function tranverseModule<E1>(m: QuasiModule<E1>, p: (e: E1) => void) {
    return m.map((t) => {
        switch (t.kind) {
            case "element": {
                p(t)
                return;
            }
            case "alternation": {
                t.psubs.map((ps) => tranverseModule<E1>(ps.mod, p))
                return
            }
            case "repetition": {
                tranverseModule<E1>(t.sub, p)
                return
            }
        }
    })
}