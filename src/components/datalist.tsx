import { Values } from "./boxes";

export function DataList({ options, searchText, hidden, setText }: { options: string[], searchText: string, hidden: boolean, setText: (e: string) => void }) {
    if (!searchText || hidden) return <></>

    searchText = searchText.toLowerCase()
    options = options.filter((e) => e.toLowerCase().includes(searchText))

    let choices = []
    const length = searchText.length
    let formatted = options.map(e => {
        const searchTarget = e.toLowerCase()
        const indexes: number[] = []
        const parts = []

        // Create a list of indecies where searchText appears
        for (let i = searchTarget.indexOf(searchText, 0); i != -1; i++, i = e.indexOf(searchText, i)) {
            indexes.push(i)
        }

        // Strip parts of the string using the indecies and append to new list
        let remaing = e
        indexes.reverse().forEach(i => {
            const end = remaing.substring(i + length)
            const replace = <mark className="bg-blue-600">{remaing.substring(i, i + length)}</mark>
            remaing = e.substring(0, i)
            parts.unshift(end)
            parts.unshift(replace)
        })
        parts.unshift(remaing)
        return { text: e, htlm: parts }
    })

    choices = formatted.map((text, i) => <p onMouseDown={() => { setText(text['text']) }} className={" w-full border-2 p-2  " + Values.Next}>{text['htlm']}</p>).slice(0, 10)
    // TODO: Sort Later (never)

    return <div className="relative" >
        <div className="bg-black/80 absolute w-full top bottom-full" >
            {choices}
        </div>
    </div>
}
