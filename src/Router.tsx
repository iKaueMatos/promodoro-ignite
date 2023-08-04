import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layouts/DefaultLayout';


export function Router() {
    return (
        <Routes>
            {/* We define the default latout as / because it is responsible
             for taking all the routes that have the / and inserting in all 
             our default layout */}
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/history" element={<History/>}/>
            </Route>
        </Routes>
    );
}