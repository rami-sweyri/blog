import React, { Suspense, lazy } from "react";
import { Route, Routes as Switch } from "react-router-dom";
const Posts = lazy(() => import("../pages/posts"));
const Post = lazy(() => import("../pages/post"));

const Routes = () => {
  return (
    <Suspense
      fallback={
        <div className="relative flex flex-col w-full h-full justify-center items-center">
          loading...
        </div>
      }>
      <Switch>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/pages" element={<Posts />} />
        <Route exact path="/pages/:id" element={<Post />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
