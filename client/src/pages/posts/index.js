import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters, AiOutlinePlusCircle } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "../../components/post";
import PostForm from "../../components/post-form";
import Layout from "../../layout";

import { clearPosts, readPosts } from "../../redux/actions/posts";
import Loader from "../../components/loader";

const Posts = () => {
  const { posts, loading, pagination, readable } = useSelector(
    state => state.postsReducer
  );
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    if (!readable) {
      dispatch(readPosts({}));
    }
    // return () => {
    //   dispatch(clearPosts());
    // };
  }, [readable]);

  return (
    <Layout>
      {!readable ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full p-6 mt-12 md:w-9/12 lg:w-6/12 xl:w-4/12">
          <div className="flex flex-col w-full h-full ">
            <PostForm
              post={post}
              showModal={showModal}
              setShowModal={setShowModal}
            />
            {pagination.limit && (
              <InfiniteScroll
                dataLength={pagination.limit * pagination.current}
                next={() => {
                  dispatch(readPosts({ page: pagination.next }));
                }}
                hasMore={pagination.current < pagination.totalPages}
                // loader={
                //   <div className="flex items-center justify-center">
                //     <Loader />
                //   </div>
                // }
                endMessage={
                  <p className="mt-12 text-xs text-center text-white">
                    You have seen it all
                  </p>
                }>
                {posts.map(post => (
                  <Post
                    key={post._id}
                    showComments={showComments}
                    setShowComments={setShowComments}
                    post={post}
                    setShowModal={setShowModal}
                    setPost={setPost}
                  />
                ))}{" "}
              </InfiniteScroll>
            )}
          </div>
        </div>
      )}
      <div
        className="fixed text-5xl text-white transition-all duration-500 transform cursor-pointer hover:rotate-180 right-5 bottom-5"
        onClick={() => {
          setShowModal(true);
          setPost({});
        }}>
        <AiOutlinePlusCircle />
      </div>
    </Layout>
  );
};

export default Posts;
