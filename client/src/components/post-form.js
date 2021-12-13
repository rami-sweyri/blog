import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { creatPost, updatePost } from "../redux/actions/posts";
import _objI from "../utils/_objI";
import Modal from "./modal";

const PostForm = ({ showModal, setShowModal, post }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (_objI(post)) {
      setFormData({ title: post.title, body: post.body });
    }
  }, [post]);
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    if (_objI(post)) {
      dispatch(updatePost({ ...formData, _id: post._id })).then(res => {
        if (res.status === 200) {
          setShowModal(false);
          setFormData({ title: "", body: "" });
        }
      });
    } else {
      dispatch(creatPost(formData)).then(res => {
        if (res.status === 201) {
          setShowModal(false);
          setFormData({ title: "", body: "" });
        }
      });
    }
  };
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <div className="flex flex-col w-full ">
        <input
          className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none bg-main-300"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={onChange}
        />
        <textarea
          className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none bg-main-300"
          name="body"
          value={formData.body}
          placeholder="Body"
          onChange={onChange}
        />
        <button
          className="w-full p-3 my-3 text-xs text-white rounded-lg shadow outline-none appearance-none hover:bg-main-200 bg-main-300"
          onClick={onSubmit}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default PostForm;
