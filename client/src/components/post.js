import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, showComments, setShowComments }) => {
  const [comment, setComment] = useState("");
  const { posts, readable } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();
  return (
    <div
      className={`flex flex-col shadow justify-center items-center bg-main-300 rounded my-3 w-full h-full overflow-hidden`}>
      <div className="flex items-center justify-between w-full p-3 bg-main-100 ">
        <p className="text-sm text-white"> {post.title}</p>
        <span className="text-xs text-gray-100">
          {format(new Date(post.createdAt), "dd/MM/yyyy")}
        </span>
      </div>
      <p className="p-3 mt-3 text-sm leading-6 text-white ">{post.body}</p>
      <div className="flex justify-end w-full p-3">
        <div
          className="text-2xl text-white cursor-pointer"
          onClick={() => setShowComments(post._id)}>
          <AiOutlineComment />
        </div>
      </div>
      {showComments === post._id && (
        <div className="flex items-center justify-between w-full p-3 bg-main-100">
          <div className="relative flex items-center w-full">
            <input
              className="w-full p-3 py-2 text-xs text-white outline-none appearance-none bg-main-200"
              name="comment"
              placeholder="Add Comment"
              onChange={e => setComment(e.target.value)}
            />
            {comment.length > 0 && (
              <span
                className="absolute text-xs text-white cursor-pointer right-2"
                onClick={() => {
                  dispatch();
                }}>
                Send
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
