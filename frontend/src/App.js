import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (
    <div>
      <h1>Welcome to BenchBnb</h1>
      <Switch>
        <Route path='/login' component={LoginForm}/>
      </Switch>
    </div>
  );
}

export default App;
