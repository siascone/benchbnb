import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';

function App() {
  return (
    <div>
      <h1>Welcome to BenchBnb</h1>
      <Switch>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignupForm}/>
      </Switch>
    </div>
  );
}

export default App;
