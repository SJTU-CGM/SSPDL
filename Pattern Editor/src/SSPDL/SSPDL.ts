export {
    Model, Namespace, ElementDef, Module, ModuleItem, Element,
    PWM, Distribution, CodeDistribution, Alphabet, ElementKind,
    QuasiModule, QuasiModuleItem, QuasiAlternation, QuasiRepetition
};


interface Namespace { [key : string] : ElementDef };


type Alphabet = string[]

interface Model {
    alphabet: Alphabet
    namespace: Namespace;
    background: CodeDistribution;
    root: Module;
};


type ElementDef = MotifDef | GeneralizedMotifDef | SpacerDef;

interface Distribution {
    from: number;
    probs: number[];
};
interface CodeDistribution {
    [key: string]: number;
}
type PWM = CodeDistribution[];


enum ElementKind {
    Motif = "motif",
    GMotif = "g-motif",
    Spacer = "spacer"
}


interface MotifDef {
    kind : "motif";
    color: string;
    matrix : PWM;
}


interface GeneralizedMotifDef {
    kind: "g-motif";
    color: string;
    distribution: Distribution;
    matrix: PWM
}


interface SpacerDef {
    kind : "spacer";
    distribution: Distribution;
}

type Element = {
    name: string
};
type Module = QuasiModule<Element>;
type ModuleItem = QuasiModuleItem<Element>
type QuasiModule<E> = QuasiModuleItem<E>[];
type QuasiModuleItem<E> = QuasiElement<E> | QuasiAlternation<E> | QuasiRepetition<E>;


type QuasiElement<E> = E & {
    kind: "element";
};


interface QuasiAlternation<E> {
    kind: "alternation";
    psubs: { prob: number; mod: QuasiModule<E>; }[];
}


interface QuasiRepetition<E> {
    kind: "repetition";
    prob: number;
    sub: QuasiModule<E>;
}