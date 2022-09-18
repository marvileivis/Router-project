import {useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../hooks/use-http';
import {getAllComments} from '../lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import CommentsList from './CommentsList';
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params=useParams();
  const {quoteid}=params;
  const {sendRequest,status,data:loadedComments}=useHttp();
useEffect(()=>{
sendRequest(quoteid);
},[quoteid,sendRequest]);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedCommentHandler=()=>{

  }
  let comments;
  if(status==='pending'){
comments=(<div className='centered'><LoadingSpinner/></div>);
  }
  if(status==='completed' &&loadedComments&&loadedComments.length>0){
comments=<CommentsList comments={loadedComments}/>
  }
  if(status==='completed' &&loadedComments&&loadedComments.length===0){
    comments=<p classNAme='centered'>No comments</p>;
      }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={useParams.quoteId} onAddedComment={addedCommentHandler}/>}
      <p>{comments}</p>
    </section>
  );
};

export default Comments;
