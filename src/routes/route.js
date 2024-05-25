//route.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";

const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const UserListPage = React.lazy(() => import("../pages/UserListPage"));
const CreateUserPage = React.lazy(() => import("../pages/CreateUserPage"));
const EditUserPage = React.lazy(() => import("../pages/EditUserPages"));
const FilePreview = React.lazy(() => import("../components/FilePreview"));

const routes = (
  <ErrorBoundary>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-user"
        element={
          <PrivateRoute>
            <CreateUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-user/:userId"
        element={
          <PrivateRoute>
            <EditUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/file-preview/:userId"
        element={
          <PrivateRoute>
            <FilePreview />
          </PrivateRoute>
        }
      />
    </Routes>
  </ErrorBoundary>
);

export default routes;
