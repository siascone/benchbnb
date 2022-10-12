import BenchListItem from "./BenchListItem";

function BenchList({ benches }) {
    return (
        <div>
            <h2>Bench List</h2>
            <ul>
                {benches.map(bench => {
                    return <BenchListItem key={bench.id} bench={bench}/>
                })}
            </ul>
        </div>
    )
}

export default BenchList;