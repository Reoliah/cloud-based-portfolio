import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

const initialProjectForm = {
  id: "",
  title: "",
  description: "",
  techStack: "",
  externalUrl: "",
};

const initialBlogForm = {
  id: "",
  title: "",
  description: "",
  category: "",
};

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("project");
  const [password, setPassword] = useState("");
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [projectFiles, setProjectFiles] = useState(null);
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [blogFiles, setBlogFiles] = useState(null);
  const [status, setStatus] = useState(null);

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const pRes = await fetch("/api/projects");
      if (pRes.ok) setProjects(await pRes.json());

      const bRes = await fetch("/api/blogs");
      if (bRes.ok) setBlogs(await bRes.json());
    } catch (err) {
      console.error("Error fetching admin lists:", err);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchItems();
    }
  }, [authenticated]);

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setStatus(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setStatus(null);
    } else {
      setStatus({ error: "Invalid password" });
    }
  };

  const submitForm = async (endpoint, formData) => {
    setStatus({ loading: true });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          "x-admin-password": ADMIN_PASSWORD,
        },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setStatus({ success: true, data });
      
      setEditingId(null); 
      fetchItems();
      return data;
    } catch (e) {
      setStatus({ error: e?.error || "Failed" });
      return null;
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete this ${activeTab}?`);
    if (!confirmDelete) return;

    setStatus({ loading: true });
    const endpoint = activeTab === "project" ? `/api/projects/${editingId}` : `/api/blogs/${editingId}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "x-admin-password": ADMIN_PASSWORD,
        },
      });
      const data = await res.json();
      if (!res.ok) throw data;

      setStatus({ success: true, data: { id: "Item deleted successfully" } });
      
      setProjectForm(initialProjectForm);
      setBlogForm(initialBlogForm);
      setProjectFiles(null);
      setBlogFiles(null);
      setEditingId(null);
      fetchItems();
    } catch (e) {
      setStatus({ error: e?.error || "Failed to delete item" });
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.id || !projectForm.title) {
      return setStatus({ error: "id and title required" });
    }

    const fd = new FormData();
    fd.append("id", projectForm.id);
    fd.append("title", projectForm.title);
    fd.append("description", projectForm.description);
    fd.append("techStack", projectForm.techStack);
    fd.append("externalUrl", projectForm.externalUrl);
    
    if (editingId && editingId !== projectForm.id) {
      fd.append("oldId", editingId);
    }

    if (projectFiles) {
      projectFiles.forEach((f) => fd.append("images", f));
    }

    const data = await submitForm("/api/projects", fd);
    if (data) {
      setProjectForm(initialProjectForm);
      setProjectFiles(null);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.id || !blogForm.title) {
      return setStatus({ error: "id and title required" });
    }

    const fd = new FormData();
    fd.append("id", blogForm.id);
    fd.append("title", blogForm.title);
    fd.append("description", blogForm.description);
    fd.append("category", blogForm.category);
    
    if (editingId && editingId !== blogForm.id) {
      fd.append("oldId", editingId);
    }

    if (blogFiles) {
      blogFiles.forEach((f) => fd.append("images", f));
    }

    const data = await submitForm("/api/blogs", fd);
    if (data) {
      setBlogForm(initialBlogForm);
      setBlogFiles(null);
    }
  };

  const selectProjectForEdit = (proj) => {
    setEditingId(proj.id); 
    setProjectFiles(null); 
    setProjectForm({
      id: proj.id,
      title: proj.title,
      description: proj.description || "",
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack || "",
      externalUrl: proj.externalUrl || "",
    });
    setStatus(null);
  };

  const selectBlogForEdit = (blog) => {
    setEditingId(blog.id); 
    setBlogFiles(null); 
    setBlogForm({
      id: blog.id,
      title: blog.title,
      description: blog.description || "",
      category: blog.category || "",
    });
    setStatus(null);
  };

  // --- 🌟 NEW: ARRAY MANIPULATION HANDLING UTILITIES ---
  const moveProjectFile = (index, direction) => {
    if (!projectFiles) return;
    const updatedFiles = [...projectFiles];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updatedFiles.length) return;

    const temp = updatedFiles[index];
    updatedFiles[index] = updatedFiles[targetIndex];
    updatedFiles[targetIndex] = temp;
    setProjectFiles(updatedFiles);
  };

  const removeProjectFile = (index) => {
    setProjectFiles((prev) => (prev ? prev.filter((_, i) => i !== index) : null));
  };

  const moveBlogFile = (index, direction) => {
    if (!blogFiles) return;
    const updatedFiles = [...blogFiles];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updatedFiles.length) return;

    const temp = updatedFiles[index];
    updatedFiles[index] = updatedFiles[targetIndex];
    updatedFiles[targetIndex] = temp;
    setBlogFiles(updatedFiles);
  };

  const removeBlogFile = (index) => {
    setBlogFiles((prev) => (prev ? prev.filter((_, i) => i !== index) : null));
  };

  return (
    <section className="w-full flex flex-col mt-24 mx-auto px-6 md:px-20 md:gap-10 pb-20">
      <PageHero title="ADMIN" />

      {authenticated && (
        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-gray-200 dark:border-gray-800 pb-4">
          <p className="font-body text-sm text-gray-500 dark:text-gray-400">
            Manage projects and blogs in one place.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-[14px] border border-gray-300 dark:border-gray-700 px-4 py-2 text-base font-display font-semibold uppercase text-primary-light dark:text-primary-dark transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}

      {!authenticated ? (
        <form onSubmit={handleLogin} className="max-w-xl mt-6">
          <label className="font-body font-normal text-base block mb-2">Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded mb-4 bg-gray-200 dark:bg-gray-800"
          />
          <button
            className="font-display font-semibold text-base uppercase bg-primary-light dark:bg-primary-dark text-white/80 px-4 py-2 rounded transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
          {status?.error && <p className="mt-2 text-red-600">{status.error}</p>}
        </form>
      ) : (
        <div className="mt-4 space-y-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab("project");
                setProjectForm(initialProjectForm);
                setProjectFiles(null);
                setEditingId(null);
                setStatus(null);
              }}
              className={`rounded-[14px] px-4 py-2 text-sm font-display font-semibold transition-colors duration-300 ${activeTab === "project" ? "bg-primary-light dark:bg-primary-dark text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("blog");
                setBlogForm(initialBlogForm);
                setBlogFiles(null);
                setEditingId(null);
                setStatus(null);
              }}
              className={`rounded-[14px] px-4 py-2 text-sm font-display font-semibold transition-colors duration-300 ${activeTab === "blog" ? "bg-primary-light dark:bg-primary-dark text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
            >
              Blogs
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl space-y-3 max-h-[600px] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-2">
                <h3 className="font-display font-bold uppercase tracking-wider text-xs text-gray-500">
                  Existing {activeTab === "project" ? "Projects" : "Blogs"} (
                  {activeTab === "project" ? projects.length : blogs.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "project") setProjectForm(initialProjectForm);
                    else setBlogForm(initialBlogForm);
                    setProjectFiles(null);
                    setBlogFiles(null);
                    setEditingId(null);
                    setStatus(null);
                  }}
                  className="text-xs bg-primary-light/10 text-primary-light dark:text-primary-dark hover:bg-primary-light/20 px-2 py-1 rounded font-body font-medium"
                >
                  + Create New
                </button>
              </div>

              {activeTab === "project" ? (
                projects.length === 0 ? (
                  <p className="font-body text-sm text-gray-400">No projects found.</p>
                ) : (
                  projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => selectProjectForEdit(proj)}
                      className={`w-full text-left p-3 rounded transition-all text-sm border flex flex-col gap-1 ${projectForm.id === proj.id || editingId === proj.id ? "bg-primary-light text-white border-primary-light" : "bg-gray-200/50 dark:bg-gray-800/50 border-transparent hover:bg-gray-200 dark:hover:bg-gray-800"}`}
                    >
                      <span className="font-bold line-clamp-1">{proj.title}</span>
                      <span className={`text-xs ${projectForm.id === proj.id || editingId === proj.id ? "text-blue-200" : "text-gray-400"}`}>
                        ID: {proj.id}
                      </span>
                    </button>
                  ))
                )
              ) : blogs.length === 0 ? (
                <p className="font-body text-sm text-gray-400">No blogs found.</p>
              ) : (
                blogs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => selectBlogForEdit(b)}
                    className={`w-full text-left p-3 rounded transition-all text-sm border flex flex-col gap-1 ${blogForm.id === b.id || editingId === b.id ? "bg-primary-light text-white border-primary-light" : "bg-gray-200/50 dark:bg-gray-800/50 border-transparent hover:bg-gray-200 dark:hover:bg-gray-800"}`}
                  >
                    <span className="font-body font-bold line-clamp-1">{b.title}</span>
                    <span className={`text-xs ${blogForm.id === b.id || editingId === b.id ? "text-blue-200" : "text-gray-400"}`}>
                      ID: {b.id}
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="lg:col-span-2">
              {activeTab === "project" ? (
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-body font-medium">ID (slug)</label>
                    <input
                      value={projectForm.id}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, id: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="hosting-s3"
                    />
                    {editingId && editingId !== projectForm.id && (
                      <p className="text-xs text-amber-500 font-bold mt-1">
                        ⚠️ Changing this ID will update the route endpoint and migrate data folders from "{editingId}".
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Title</label>
                    <input
                      value={projectForm.title}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="Hosting a website with Amazon S3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2 rounded h-32 placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="Write the full project description here..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Tech stack (comma separated)</label>
                    <input
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, techStack: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="React, AWS, Tailwind"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">External link</label>
                    <input
                      value={projectForm.externalUrl}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, externalUrl: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="https://github.com/your-repo"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">
                      Images {projectFiles?.length > 0 && <span className="text-xs text-primary-light dark:text-primary-dark font-bold ml-1">({projectFiles.length} staged for appending)</span>}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setProjectFiles((prev) => prev ? [...prev, ...files] : files);
                      }}
                      className="w-full bg-gray-200 dark:bg-gray-800 p-2 rounded shadow-inner"
                    />

                    {/* 🌟 NEW: PROJECT VISUAL STAGING ROW DISPLAY */}
                    {projectFiles && projectFiles.length > 0 && (
                      <div className="flex gap-3 overflow-x-auto py-4 px-3 bg-gray-100 dark:bg-gray-900/50 rounded-xl mt-3 border border-dashed border-gray-300 dark:border-gray-700">
                        {projectFiles.map((file, idx) => (
                          <div key={idx} className="relative flex-shrink-0 flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-700">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Staged Project Item Thumbnail"
                              className="w-20 h-20 object-cover rounded shadow"
                            />
                            <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                              {idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeProjectFile(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-bold hover:bg-red-700 transition-colors"
                            >
                              ×
                            </button>
                            <div className="flex items-center justify-between w-full mt-2 px-0.5 gap-2">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveProjectFile(idx, -1)}
                                className="text-[11px] font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-30 rounded px-1.5 py-0.5 shadow-sm border border-gray-300 dark:border-gray-600"
                              >
                                ←
                              </button>
                              <button
                                type="button"
                                disabled={idx === projectFiles.length - 1}
                                onClick={() => moveProjectFile(idx, 1)}
                                className="text-[11px] font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-30 rounded px-1.5 py-0.5 shadow-sm border border-gray-300 dark:border-gray-600"
                              >
                                →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      className="bg-primary-light dark:bg-primary-dark text-white px-6 py-2 rounded-[14px] font-display font-semibold shadow hover:scale-98 transition-all"
                      type="submit"
                    >
                      {editingId ? "Update Project" : "Create Project"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-[14px] font-display font-semibold shadow transition-all"
                      >
                        Delete Project
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-body font-medium">ID (slug)</label>
                    <input
                      value={blogForm.id}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, id: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="deploying-with-vercel"
                    />
                    {editingId && editingId !== blogForm.id && (
                      <p className="text-xs text-amber-500 font-bold mt-1">
                        Changing this ID will update the route endpoint and migrate data folders from "{editingId}".
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Title</label>
                    <input
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="How I deployed my portfolio"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Blog content</label>
                    <textarea
                      value={blogForm.description}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2 rounded h-40 placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="Write the blog post content here..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">Category</label>
                    <input
                      value={blogForm.category}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 rounded placeholder:text-gray-500 bg-gray-200 dark:bg-gray-800"
                      placeholder="PERSONAL GROWTH"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-body font-medium">
                      Images {blogFiles?.length > 0 && <span className="text-xs text-primary-light dark:text-primary-dark font-bold ml-1">({blogFiles.length} staged for appending)</span>}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setBlogFiles((prev) => prev ? [...prev, ...files] : files);
                      }}
                      className="w-full bg-gray-200 dark:bg-gray-800 p-2 rounded shadow-inner"
                    />

                    {/* 🌟 NEW: BLOG VISUAL STAGING ROW DISPLAY */}
                    {blogFiles && blogFiles.length > 0 && (
                      <div className="flex gap-3 overflow-x-auto py-4 px-3 bg-gray-100 dark:bg-gray-900/50 rounded-xl mt-3 border border-dashed border-gray-300 dark:border-gray-700">
                        {blogFiles.map((file, idx) => (
                          <div key={idx} className="relative flex-shrink-0 flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-700">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Staged Blog Item Thumbnail"
                              className="w-20 h-20 object-cover rounded shadow"
                            />
                            <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                              {idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeBlogFile(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-bold hover:bg-red-700 transition-colors"
                            >
                              ×
                            </button>
                            <div className="flex items-center justify-between w-full mt-2 px-0.5 gap-2">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveBlogFile(idx, -1)}
                                className="text-[11px] font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-30 rounded px-1.5 py-0.5 shadow-sm border border-gray-300 dark:border-gray-600"
                              >
                                ←
                              </button>
                              <button
                                type="button"
                                disabled={idx === blogFiles.length - 1}
                                onClick={() => moveBlogFile(idx, 1)}
                                className="text-[11px] font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-30 rounded px-1.5 py-0.5 shadow-sm border border-gray-300 dark:border-gray-600"
                              >
                                →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      className="bg-primary-light dark:bg-primary-dark text-white px-6 py-2 rounded-[14px] font-display font-semibold shadow hover:scale-98 transition-all"
                      type="submit"
                    >
                      {editingId ? "Update Blog" : "Create New Blog"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-[14px] font-display font-semibold shadow transition-all"
                      >
                        Delete Blog
                      </button>
                    )}
                  </div>
                </form>
              )}

              <div className="mt-4">
                {status?.loading && <p className="font-display uppercase text-primary-light dark:text-primary-dark">Processing...</p>}
                {status?.success && <p className="text-green-600 font-display uppercase font-medium">{status.data.id}</p>}
                {status?.error && <p className="text-red-600 font-display uppercase font-medium">Error: {status.error}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}