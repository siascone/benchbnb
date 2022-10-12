import { Route, Switch } from 'react-router-dom';
// import LoginForm from './components/LoginForm/LoginForm';
// import SignupForm from './components/SignupForm/SignupForm';
import Navigation from './components/Navigation/Navigation';
import BenchIndexPage from './components/BenchIndexPage/BenchIndexPage'
import BenchShowPage from './components/BenchShowPage/BenchShowPage';

function App() {
  return (
    <div>
      <h1>Welcome to BenchBnb</h1>
      <Navigation />
      <Switch>
        <Route exact path='/' component={BenchIndexPage} />
        <Route exact path='/benches/:benchId' component={BenchShowPage} />
        {/* <Route path='/login' component={LoginForm}/> */}
        {/* <Route path='/signup' component={SignupForm}/> */}
      </Switch>
    </div>
  );
}

export default App;
