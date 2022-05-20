import { Switch, Route, Redirect } from 'react-router-dom';
// import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
// import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
// import Maps from 'pages/Maps';
// import Footer from 'components/Footer';
import createsubAdmin from 'pages/createsubAdmin';
import InitialTranfer from 'pages/initialTranfer';
import Login from 'pages/login';


// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <>
            
                <Switch>
                    <Route exact path="/" component={Login} />             
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/wallet" component={Tables} />
                    <Route exact path="/addsub" component={createsubAdmin} />
                    <Route exact path="/initialtranfer" component={InitialTranfer} />
                    <Redirect from="*" to="/" />                  
                </Switch>
            
        </>
    );
}

export default App;
