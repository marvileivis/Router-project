import {useParams, Route, useRouteMatch,Link} from 'react-router-dom';
import React, {Fragment} from 'react';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../components/hooks/use-http';
import {getAllQuotes} from '../components/lib/api';
import {useEffect} from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const QuoteDetail=()=>{
    const match=useRouteMatch();
    
    const params=useParams();
    const {sendRequest,status, data:quotesAll, error}=useHttp(getAllQuotes,true);
    useEffect(()=>{
sendRequest();
    },[sendRequest]);
    if(status==='pending'){
        return (<div className='centered'>
            <LoadingSpinner/>
        </div>)
    }
    if(error){
return <p className='centered focus'>{error}</p>
    }
    if(status==='completed' && (!quotesAll||quotesAll.length===0)){
        return <NoQuotesFound/>

    }

  const foundedQuote=quotesAll.find(quote=>quote.id===params.quoteid)
 if(!foundedQuote.text){
  return <NoQuotesFound/>
 }
    return (
    <React.Fragment>
<HighlightedQuote text={foundedQuote.text} author={foundedQuote.author}/>
<Route path={`$match.path}`} exact>
<div className='centered'>
<Link className='btn-flat'to={`${match.url}/comments`}>Load Comments</Link>
</div>
</Route>


<Route path={`${match.path}/comments`}> 
    <Comments/>
</Route>
    </React.Fragment>
    )
 
};
export default QuoteDetail;