import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/modal";
import Post from "../../components/post";
import Layout from "../../layout";
import { creatPost, readPosts } from "../../redux/actions/posts";

const Posts = () => {
  const { posts, readable } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [showComments, setShowComments] = useState(false);

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
            <Post
              key={post._id}
              showComments={showComments}
              setShowComments={setShowComments}
              post={post}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
