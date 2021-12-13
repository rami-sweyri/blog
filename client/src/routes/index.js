import React, { Suspense, lazy } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Loader from "../components/loader";
import Layout from "../layout";
const Posts = lazy(() => import("../pages/posts"));
const Post = lazy(() => import("../pages/post"));

const Routes = () => {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        </Layout>
      }>
      <Switch>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/posts/:id" element={<Post />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
