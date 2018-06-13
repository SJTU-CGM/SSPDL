import * as JSXFactory from "../JSX/SVGFactory";


export const Box: JSXFactory.Builder<{ size: number, fill: string, stroke: string }> = (prop) => {
    return (
        <svg
            width={prop.size.toString()}
            height={prop.size.toString()}
        >
            <rect
                x={1} y={1}
                width={prop.size-2} height={prop.size-2}
                fill={prop.fill}
                stroke={prop.stroke}
            />
        </svg>
    )
}