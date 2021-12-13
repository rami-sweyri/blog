import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/modal";
import Layout from "../../layout";
import { creatPost, readPosts } from "../../redux/actions/posts";
import { format } from "date-fns";

const Posts = () => {
  const { posts, readable } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    if (!readable) {
      dispatch(readPosts());
    }
    // return () => {
    //   cleanup;
    // };
  }, [readable]);
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Layout>
      <div className="flex flex-col w-full p-6 mt-12 md:w-9/12 lg:w-6/12 xl:w-4/12">
        <div className="flex flex-col w-full h-full ">
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className="flex flex-col w-full ">
              <input
                className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none bg-main-300"
                name="title"
                placeholder="Title"
                onChange={onChange}
              />
              <textarea
                className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none bg-main-300"
                name="body"
                placeholder="Body"
                onChange={onChange}
              />
              <button
                className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none hover:bg-main-200 bg-main-300"
                onClick={() => {
                  dispatch(creatPost(formData));
                  setShowModal(false);
                }}>
                Submit
              </button>
            </div>
          </Modal>
          {posts.map(post => (
            <div
              className={`flex flex-col justify-center items-center bg-main-300 rounded my-3 w-full h-full overflow-hidden`}
              key={post.id}>
              <div className="flex items-center justify-between w-full p-3 bg-main-100 ">
                <p className="text-sm text-white"> {post.title}</p>
                <span className="text-xs text-gray-100">
                  {format(new Date(post.createdAt), "dd/MM/yyyy")}
                </span>
              </div>
              <p className="p-3 mt-3 text-sm leading-6 text-white ">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
