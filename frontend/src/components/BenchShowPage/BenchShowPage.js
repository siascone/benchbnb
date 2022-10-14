import { useSelector, useDispatch} from 'react-redux';
import { useParams, useRouteMatch, NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchBench } from '../../store/benches';
import '../BenchIndexPage/BenchIndex.css';

function BenchShowPage() {
    const route = useRouteMatch();
    const params = useParams();
    const bench = useSelector(state => state.benches[params.benchId])
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchBench(params.benchId))
    }, [])
    
    if (!bench) return null;

    return (
        <div className='bench-show-container'>
            <div>
                <h2>{bench.title}</h2>
                <NavLink to='/'>Bench Index</NavLink>
            </div>
            <div>
                <h3>Details:</h3>
                <p>{bench.description}</p>
                <ul>
                    <li>Seats: {bench.seating}</li>
                    <li>Latitude: {bench.lat}</li>
                    <li>Longitude: {bench.lng}</li>
                </ul>
                
            </div>
            {/* <p>Price: ${bench.price}/hr</p> */}
        </div>
    )
}

export default BenchShowPage;