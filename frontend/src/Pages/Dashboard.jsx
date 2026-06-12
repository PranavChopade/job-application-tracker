import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import JobModal from '../Components/JobModal'
import { useJobs } from "../hooks/useJobs"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    description: "",
    resume: "",
    status: "applied"
  })

  const { getJobsList, createJobPost, deleteJobPost, editJobPost } = useJobs()

  const fetchJobs = async () => {
    setLoading(true)
    const data = await getJobsList()
    if (data?.jobs) {
      setJobs(data.jobs)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const resetForm = () => {
    setFormData({ company: "", role: "", description: "", resume: "", status: "applied" })
    setEditingJob(null)
    setShowForm(false)
  }

  const handleEdit = (job) => {
    setEditingJob(job._id)
    setFormData({
      company: job.company,
      role: job.role,
      description: job.description,
      resume: job.resume || "",
      status: job.status
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id, company) => {
    if (!window.confirm(`Delete application for ${company}?`)) return
    const data = await deleteJobPost(id)
    if (data?.message) {
      toast.success(`Removed ${company}`)
      fetchJobs()
    } else {
      toast.error(data?.message || "Failed to delete")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.company || !formData.role || !formData.description) {
      toast.error("Company, role, and description are required")
      return
    }

    let data
    if (editingJob) {
      data = await editJobPost(editingJob, formData)
    } else {
      data = await createJobPost(formData)
    }

    if (data?.job) {
      toast.success(editingJob ? "Application updated ✨" : "Application added! 🎯")
      resetForm()
      fetchJobs()
    } else {
      toast.error(data?.message || "Something went wrong")
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied":
        return { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400" }
      case "shortlisted":
        return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" }
      case "rejected":
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400" }
      case "no response":
        return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400" }
      default:
        return { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", dot: "bg-slate-400" }
    }
  }

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "applied").length,
    shortlisted: jobs.filter(j => j.status === "shortlisted").length,
    rejected: jobs.filter(j => j.status === "rejected").length,
    noResponse: jobs.filter(j => j.status === "no response").length,
  }
  const [modal, setModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState('')

  const handleSelectedJob = (job) => {
    setSelectedJob(job);
    setModal(!modal)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total", value: stats.total, color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/20" },
              { label: "Applied", value: stats.applied, color: "from-blue-400 to-cyan-500", shadow: "shadow-blue-400/20" },
              { label: "Shortlisted", value: stats.shortlisted, color: "from-emerald-400 to-green-500", shadow: "shadow-emerald-400/20" },
              { label: "Rejected", value: stats.rejected, color: "from-red-400 to-rose-500", shadow: "shadow-red-400/20" },
            ].map((stat) => (
              <div key={stat.label} className="relative group">
                <div className={`absolute inset-0 bg-linear-to-r ${stat.color} rounded-xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Applications</h1>
            <p className="text-slate-400 text-sm mt-1">
              {loading ? "Loading..." : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} tracked`}
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm) }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95 ${showForm
              ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50"
              : "bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              }`}
          >
            <span className="text-lg leading-none">{showForm ? "✕" : "+"}</span>
            <span>{showForm ? "Cancel" : "Add Application"}</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl blur-sm"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-5">
                {editingJob ? "Edit Application" : "New Application"}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g. Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    placeholder="Brief description of the role..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Resume Name</label>
                  <input
                    type="text"
                    value={formData.resume}
                    onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="enter resume name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="no response">No Response</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-95"
                  >
                    {editingJob ? "Update" : "Add Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin"></div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-b-indigo-500 animate-spin absolute inset-0 opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-24">
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
              <div className="relative w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No applications yet</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
              Start tracking your job hunt by adding your first application
            </p>
            <button
              onClick={() => { resetForm(); setShowForm(true) }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-95"
            >
              <span>+</span>
              <span>Add your first application</span>
            </button>
          </div>
        )}

        {/* Job Cards */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => {
              const style = getStatusStyle(job.status)
              return (
                <div
                  key={job._id}
                  className="group relative"
                  onClick={() => handleSelectedJob(job)}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-slate-800/0 to-slate-800/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-2xl transition-all duration-500"></div>
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 group-hover:border-slate-700/50 rounded-2xl p-5 transition-all duration-300">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{job.company}</h3>
                        <p className="text-sm text-blue-400 font-medium truncate">{job.role}</p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        <span className="capitalize">{job.status}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-4 mb-4">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {new Date(job.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {job.resume && (
                        <span className="text-xs text-blue-400/60">{job.resume}</span>
                      )}
                    </div>

                    {/* Actions - visible on hover */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-800/50 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <button
                        onClick={() => handleEdit(job)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id, job.company)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 text-sm font-medium transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
        }

        {modal && selectedJob && (
          <JobModal job={selectedJob} onClose={() => { setModal(false); setSelectedJob(null) }} />
        )}
      </main>
    </div >
  )
}

export default Dashboard