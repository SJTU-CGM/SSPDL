export { sum, max, min, maxof, minof, format, later, assert, dummy, equal, enumerate, zip, zip2 };


const sum = (...nums: number[]): number => {
    let s = 0;
    for (let n of nums) {
        s += n;
    }
    return s;
}


const max = Math.max;
const min = Math.min;
const maxof = (a: number[]): number => max(...a);
const minof = (a: number[]): number => min(...a);


const format = (temp: string, ...fill: (string | number)[]): string => {
    let result = "";
    let i = 0;
    let j = 0;
    while (i < temp.length) {
        if (temp[i] == "%") {
            result += fill[j];
            j++;
            i++;
        }
        else {
            result += temp[i];
            i++;
        }
    }
    return result;
}


const later = (p: () => void): void => {
    setTimeout(p, 100);
}


function assert(condition: boolean, message?: string) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}


function dummy() {
    return;
}


function equal(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}


function enumerate(ls: any): { i: number, x: any }[] {
    const items = [];
    for (const [i, x] of Array.from(ls).entries()) {
        items.push({
            i: i,
            x: x
        });
    };
    return items;
}


function zip2<T1,T2>(ls0: T1[], ls1: T2[]): [T1, T2][] {
    const lim = min(ls0.length, ls1.length);
    const ls: [T1, T2][] = []
    for (let i = 0; i < lim; i++) {
        ls.push([ls0[i], ls1[i]]);
    }
    return ls;
}


function zip(... ls: any[][]): any[][] {
    if (ls.length === 0) {
        return [];
    } else {
        const ls1 = ls[0];
        const r = [];
        for (let i = 0; i < ls1.length; i++) {
            if (ls.every((l)=>i<l.length)) {
                r.push(ls.map(x => x[i]));
            } else {
                break;
            }
        }
        return r;
    }
}


export function requestFile(callback: (f: File | null)=>void): void {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.addEventListener("change", ()=>{
        const fileList = inputElement.files;
        callback(fileList ? fileList[0] : null);
    })
    inputElement.click();
}