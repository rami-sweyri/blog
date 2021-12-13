import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creatComment } from "../redux/actions/comments";
import Loader from "./loader";

const Comments = ({ post_id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { comments, loading } = useSelector(state => state.commentsReducer);

  return (
    <div className="flex flex-col items-center justify-between w-full p-3 bg-main-100">
      <div className="relative flex items-center w-full">
        <input
          className="w-full p-3 py-2 text-xs text-white outline-none appearance-none bg-main-200"
          name="comment"
          value={comment}
          placeholder="Add Comment"
          onChange={e => setComment(e.target.value)}
        />
        <span
          className="absolute text-xs text-white cursor-pointer right-2"
          onClick={() => {
            dispatch(
              creatComment({
                post: post_id,
                text: comment,
              })
            ).then(res => {
              console.log({ res });
              if (res.status === 201) {
                console.log({ res });

                setComment("");
              }
            });
          }}>
          Send
        </span>
      </div>
      <div className="flex flex-col w-full mt-3">
        {loading ? (
          <div className="flex justify-start mt-2">
            <Loader size="1rem" />
          </div>
        ) : (
          comments.map(comment => (
            <p key={comment._id} className="my-1 text-xs text-white">
              {comment.text}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
