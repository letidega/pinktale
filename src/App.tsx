/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Search from "./pages/Search";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";
import Profile from "./pages/Profile";
import { DarkModeProvider } from "./lib/DarkModeContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Global Nav Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Detail/Edit Routes (No Global Nav) */}
          <Route 
            path="/book/:id" 
            element={<ProtectedRoute><BookDetail /></ProtectedRoute>} 
          />
          <Route 
            path="/edit/:id" 
            element={<ProtectedRoute><EditBook /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}
