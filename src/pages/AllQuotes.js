import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../components/hooks/use-http';
import {getAllQuotes} from '../components/lib/api';
import {useEffect} from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const AllQuotes=()=>{
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

return <QuoteList quotes={quotesAll}/>
};
export default AllQuotes;