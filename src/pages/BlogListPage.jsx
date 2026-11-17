import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getBlogs, deleteBlog } from "../services/blogService";

function BlogListPage() {
    const { user, logout } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Retrieve blogs when the page loads
    useEffect(() => {
        async function loadBlogs() {
            try {
                const result = await getBlogs();
                setBlogs(result);
            } catch (error) {
                setError("Could not load blog posts.");
            } finally {
                setLoading(false);
            }
        }
        loadBlogs();
    }, []);

    // Delete a blog
    async function handleDelete(blogId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmed) return;

        try {
            await deleteBlog(blogId);
            setBlogs((currentBlogs) =>
                currentBlogs.filter((blog) => blog.id !== blogId)
            );
        } catch (error) {
            setError("Could not delete this post.");
        }
    }

    // Logout
    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            setError("Could not log out.");
        }
    }

    return (
        <main className="page">
            <header className="header">
                <div>
                    <h1>Blog Posts</h1>
                    <p>Logged in as {user?.email}</p>
                </div>

                <div className="header-actions">
                    <Link className="button" to="/blogs/new">
                        Add Blog
                    </Link>
                    <button className="secondary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {error && <p className="error">{error}</p>}

            {loading ? (
                <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <p>No blog posts available.</p>
            ) : (
                <section className="blog-list">
                    {blogs.map((blog) => (
                        <article className="blog-card" key={blog.id}>
                            <h2>{blog.title}</h2>
                            <p className="blog-content">{blog.content}</p>
                            {blog.authorUid === user?.uid && (
                                <div className="actions">                                    <Link className="button" to={`/blogs/${blog.id}/edit`}>
                                        Edit
                    </Link>
                    
                                            <button className="danger" onClick={() => handleDelete(blog.id)}>
                                    Delete
                    </button>
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default BlogListPage;
