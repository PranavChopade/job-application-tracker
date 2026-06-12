import React, { useEffect } from 'react'

const JobModal = ({ job, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

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

  const style = getStatusStyle(job.status)

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg animate-paper-open origin-center">
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 max-h-[80vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="p-6 pb-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white truncate">{job.company}</h2>
                  <p className="text-blue-400 font-medium mt-0.5">{job.role}</p>
                </div>
                <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border} mr-8`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  <span className="capitalize">{job.status}</span>
                </span>
              </div>
            </div>

            <div className="mx-6 my-4 h-px bg-linear-to-r from-slate-700/50 via-slate-700 to-slate-700/50" />

            <div className="px-6 pb-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>

              <div className="mt-5 pt-4 border-t border-slate-800/50 flex flex-wrap items-center gap-4 text-sm">
                <span className="text-slate-500">
                  📅 {new Date(job.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                {job.resume && (
                  <span className="text-blue-400/70">📎 {job.resume}</span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 hover:rotate-90"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobModal