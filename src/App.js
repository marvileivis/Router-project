import {Route, Switch, Redirect} from 'react-router-dom';
import React, {Suspense} from 'react';



import MainNavigation from './components/layout/MainNavigation';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
const QuoteDetail=React.lazy(()=>import('./pages/QuoteDetail'));
const NewQuote=React.lazy(()=>import('./pages/New-Quote'));
const AllQuotes=React.lazy(()=>import('./pages/AllQuotes'));
const NotFound=React.lazy(()=>import("./pages/NotFound"));
function App() {
 
  return (
   <Layout>
    <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
   <Switch>
    <Route path='/' exact>
      <Redirect to='/quotes'/>
    </Route>
    <Route path='/quotes' exact>
      <AllQuotes/>
    </Route>
    <Route path='/quotes/:quoteid'>
      <QuoteDetail/>
    </Route>
    <Route path='/new-quote'>
      <NewQuote/>
    </Route>
    <Route path='*'>
<NotFound/>
    </Route>
   </Switch> 
   </Suspense>
   </Layout>
  );
}

export default App;
