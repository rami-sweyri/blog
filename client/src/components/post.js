import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { clearComments, readComments } from "../redux/actions/comments";
import { deletePost } from "../redux/actions/posts";
import Comments from "./comments";

const Post = ({
  post,
  showComments,
  setShowComments,
  setShowModal,
  setPost,
}) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className={`flex flex-col shadow justify-center items-center bg-main-300 rounded my-3 w-full h-full overflow-hidden`}>
      <div className="relative flex items-center justify-between w-full p-3 bg-main-100 ">
        <p className="text-sm text-white"> {post.title}</p>
        <span className="mx-6 text-xs text-gray-100">
          {format(new Date(post.createdAt), "dd/MM/yyyy")}
        </span>
        <div className="absolute text-xs text-white cursor-pointer right-1">
          {" "}
          <div className="relative">
            <BiDotsVerticalRounded
              onClick={() => setShowOptions(!showOptions)}
            />
            <div
              className={`absolute ${
                showOptions ? "flex" : " hidden"
              } p-3 px-6 text-xs bg-white flex-col rounded text-main-100 right-4`}>
              {" "}
              <p className="mb-2">View</p>
              <p
                className="mb-2"
                onClick={() => {
                  setShowModal(true);
                  setShowOptions(false);
                  setPost(post);
                }}>
                Update
              </p>
              <p
                className="mb-2"
                onClick={() => dispatch(deletePost(post._id))}>
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="p-3 mt-3 text-sm leading-6 text-white ">{post.body}</p>
      <div className="flex justify-end w-full p-3">
        <div
          className="text-2xl text-white cursor-pointer"
          onClick={() => {
            dispatch(clearComments());
            setShowComments(post._id);
            dispatch(readComments(post._id));
          }}>
          <AiOutlineComment />
        </div>
      </div>

      {showComments === post._id && <Comments post_id={post._id} />}
    </div>
  );
};

export default Post;
