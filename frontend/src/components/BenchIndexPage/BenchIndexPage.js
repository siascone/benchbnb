import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';

function BenchIndexPage() {
    let dispatch = useDispatch()
    let benches = Object.values(useSelector(state => state.benches));

    useEffect(() => {
        dispatch(fetchBenches())
    }, [])

    return (
        <div>
            <BenchList benches={benches} />
        </div>
    )
}

export default BenchIndexPage;