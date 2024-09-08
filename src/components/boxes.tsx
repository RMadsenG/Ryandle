export enum Values {
    Correct = "border-green-400",
    Wrong = "border-rose-500",
    Current = "border-blue-600",
    Skipped = "border-purple-600",
    Next = "border-gray-500"
}

export enum ButtonValues {
    Correct = Values.Correct + " active:border-green-500",
    Wrong = Values.Wrong + " active:border-rose-600",
    Current = Values.Current + " active:border-blue-700",
    Skipped = Values.Skipped + " active:border-purple-700",
    Next = Values.Next + " active:border-gray-600"
}

export function Guess({ text, value }: { text: string | null, value: Values }) {
    let to_render = text ? text : <br></br>;
    return (
        <div className={"border-2 p-2 mb-2 " + value}>
            {to_render}
        </div>
    );
}
