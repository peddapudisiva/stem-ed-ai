"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload, FileText, Archive, FileSpreadsheet,
  Play, Download, Trash2, ChevronDown, FolderOpen, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES, COURSE_FILES } from "@/lib/demo-data"
import type { CourseFileType } from "@/lib/demo-data"

const FILE_ICON: Record<CourseFileType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  pdf:     { icon: FileText,        color: "#DC2626", bg: "#FEE2E2", label: "PDF"   },
  pptx:    { icon: FileText,        color: "#D97706", bg: "#FEF3C7", label: "PPTX"  },
  docx:    { icon: FileText,        color: "#2563EB", bg: "#DBEAFE", label: "DOCX"  },
  mp4:     { icon: Play,            color: "#7C3AED", bg: "#EDE9FE", label: "MP4"   },
  youtube: { icon: Play,            color: "#DC2626", bg: "#FEE2E2", label: "Video" },
  zip:     { icon: Archive,         color: "#52525B", bg: "#F4F4F2", label: "ZIP"   },
  xlsx:    { icon: FileSpreadsheet, color: "#059669", bg: "#D1FAE5", label: "XLSX"  },
}

const ACCEPTED = ".pdf,.pptx,.docx,.mp4,.zip,.xlsx"

interface UploadedFile {
  id: string
  name: string
  type: CourseFileType
  size: string
  uploadedAt: string
  courseId: string
  week?: number
}

function detectType(name: string): CourseFileType {
  const ext = name.split(".").pop()?.toLowerCase()
  if (ext === "pdf")  return "pdf"
  if (ext === "pptx" || ext === "ppt") return "pptx"
  if (ext === "docx" || ext === "doc") return "docx"
  if (ext === "mp4" || ext === "mov") return "mp4"
  if (ext === "zip")  return "zip"
  if (ext === "xlsx" || ext === "xls") return "xlsx"
  return "pdf"
}

export default function TeacherFilesPage() {
  const [courseId, setCourseId] = useState(COURSES[0].id)
  const [uploads,  setUploads]  = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [deleted,  setDeleted]  = useState<Set<string>>(new Set())
  const fileInput = useRef<HTMLInputElement>(null)

  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0]

  const existingFiles = COURSE_FILES.filter((f) => f.courseId === courseId && !deleted.has(f.id))
  const allFiles = [
    ...existingFiles.map((f) => ({
      id: f.id, name: f.name, type: f.type, size: f.size ?? "", uploadedAt: f.uploadedAt, courseId: f.courseId, week: f.week,
    })),
    ...uploads.filter((u) => u.courseId === courseId),
  ]

  const totalSize = existingFiles.reduce((sum, f) => {
    const mb = f.size ? parseFloat(f.size) * (f.size.includes("KB") ? 0.001 : 1) : 0
    return sum + mb
  }, 0)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newUploads: UploadedFile[] = Array.from(files).map((file, i) => ({
      id: `upload-${Date.now()}-${i}`,
      name: file.name,
      type: detectType(file.name),
      size: file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`,
      uploadedAt: "Just now",
      courseId,
    }))
    setUploads((prev) => [...prev, ...newUploads])
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Course Files</h1>
          <p className="mt-1 text-sm text-[#52525B]">Upload and manage materials for your courses</p>
        </div>
        <div className="relative">
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-[#E8E6E1] bg-white py-2 pl-3 pr-8 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]"
          >
            {COURSES.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
        </div>
      </div>

      {/* Storage info */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Files",     value: allFiles.length,                   color: "#4F46E5" },
          { label: "Used",      value: `${totalSize.toFixed(1)} MB`,       color: "#D97706" },
          { label: "Limit",     value: "500 MB",                           color: "#A1A1AA" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] text-[#A1A1AA]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => fileInput.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all",
          dragging
            ? "border-[#4F46E5] bg-[#EEF2FF]"
            : "border-[#E8E6E1] bg-white hover:border-[#4F46E5] hover:bg-[#FAFAF9]"
        )}
      >
        <input ref={fileInput} type="file" multiple accept={ACCEPTED} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
          dragging ? "bg-[#4F46E5]" : "bg-[#F4F4F2]"
        )}>
          <Upload className={cn("h-5 w-5", dragging ? "text-white" : "text-[#A1A1AA]")} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#18181B]">
            {dragging ? "Drop to upload" : "Drag files here or click to browse"}
          </p>
          <p className="mt-0.5 text-xs text-[#A1A1AA]">PDF, PPTX, DOCX, MP4, ZIP, XLSX · Max 100 MB per file</p>
        </div>
      </div>

      {/* File list */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="section-header">{course.code} — {course.title}</p>
          <span className="text-xs text-[#A1A1AA]">{allFiles.length} file{allFiles.length !== 1 ? "s" : ""}</span>
        </div>

        {allFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E8E6E1] bg-white py-12 text-center">
            <FolderOpen className="h-8 w-8 text-[#A1A1AA]" />
            <p className="text-sm text-[#A1A1AA]">No files uploaded yet for this course.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]">
            <AnimatePresence initial={false}>
              {allFiles.map((file, i) => {
                const cfg  = FILE_ICON[file.type]
                const Icon = cfg.icon
                const isNew = file.uploadedAt === "Just now"
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: cfg.bg }}>
                      <Icon className="h-4 w-4" style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#18181B]">{file.name}</p>
                        {isNew && (
                          <span className="shrink-0 rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669]">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#A1A1AA]">
                        <span className="font-mono mr-1" style={{ color: cfg.color }}>{cfg.label}</span>
                        {file.size && `${file.size} · `}
                        Uploaded {file.uploadedAt}
                        {file.week != null ? ` · Week ${file.week}` : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] text-[#A1A1AA] hover:border-[#D6D3CC] hover:text-[#52525B]">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleted((prev) => new Set([...prev, file.id]))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] text-[#A1A1AA] hover:border-[#FEE2E2] hover:text-[#DC2626]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Supabase Storage note */}
      <div className="flex items-start gap-2 rounded-xl border border-[#EEF2FF] bg-[#F5F3FF] px-4 py-3">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#4F46E5]" />
        <p className="text-xs text-[#4F46E5]">
          Files are stored in <span className="font-semibold">Supabase Storage</span> with per-institution FERPA isolation.
          Students enrolled in this course have read access only. No file is accessible across institutional boundaries.
        </p>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Supabase Storage · FERPA-isolated per institution · Virus scanning on upload · 500 MB per course
      </p>
    </div>
  )
}
