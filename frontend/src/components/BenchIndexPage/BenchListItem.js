import { useHistory } from 'react-router-dom';

function BenchListItem({bench}) {
    let history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('click')
        history.push(`/benches/${bench.id}`)
    }

    return (
        <div onClick={handleClick}>
            <h3>Title: {bench.title}</h3>
            <p>Price: {bench.price}</p>
        </div>
    )
}

export default BenchListItem;