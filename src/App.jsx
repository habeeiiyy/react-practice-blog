import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import BlogListPage from "./pages/BlogListPage";
import BlogFormPage from "./pages/BlogFormPage";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Checking authentication...</h2>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/blogs" : "/login"} replace />} />
    <Route path="/login" element={user ? <Navigate to="/blogs" replace /> : <LoginPage />} />
  <Route path="/blogs" element={user ? <BlogListPage /> : <Navigate to="/login" replace />} />
  <Route path="/blogs/new" element={user ? <BlogFormPage /> : <Navigate to="/login" replace />} />
     <Route path="/blogs/:id/edit" element={user ? <BlogFormPage /> : <Navigate to="/login" replace />} />
  <Route path="*" element={<Navigate to={user ? "/blogs" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
