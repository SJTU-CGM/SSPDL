export namespace CSV {
    interface CSV {
        head: string[];
        body: { [key: string]: any }[];
    }
    function parseField(f: string): string | number {
        f = f.trim();
        if (parseFloat(f) !== NaN) {
            return parseFloat(f);
        } else {
            return f;
        }
    }
    export function parse(txt: string): CSV {
        const lines = txt.trim().split("\n");
        const header = lines[0];
        const fieldNames = header.split(',');
        const lineToRecord = (line: string) => {
            const fields = line.split(',');
            const record: CSV["body"][0] = {};
            fieldNames.forEach((fn, i) => {
                record[fn] = parseField(fields[i]);
            })
            return record;
        };
        return {
            head: fieldNames,
            body: lines.slice(1).map(lineToRecord)
        }
    }
    export function dump(csv: CSV): string {
        const lines: string[] = [];
        // head
        lines.push(csv.head.join(','))
        // body
        for (const r of csv.body) {
            const fields = [];
            for (const fn of csv.head) {
                fields.push(r[fn]);
            }
            lines.push(fields.join(','));
        }
        return lines.join('\n');
    }
}