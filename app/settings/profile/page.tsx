"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Camera, User, Mail, Phone, MapPin, Globe,
  Save, CheckCircle2, AlertCircle, Pencil, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

const ROLES_DISPLAY = [
  "Student", "Teacher", "Administrator", "District Leader",
  "Curriculum Committee", "IT / Cyber", "Parent", "GovCon",
]

const INITIAL = {
  firstName:   "Jordan",
  lastName:    "Rivera",
  email:       "jordan.rivera@atlantatech.edu",
  phone:       "+1 (404) 555-0182",
  title:       "Graduate Student",
  department:  "Computer Science",
  institution: "Atlanta Technical College",
  timezone:    "America/New_York",
  language:    "en",
  bio:         "Graduate student studying AI-assisted learning systems. Interested in EdTech and STEM accessibility.",
  website:     "",
  location:    "Atlanta, GA",
}

export default function ProfilePage() {
  const [form,    setForm]    = useState(INITIAL)
  const [saved,   setSaved]   = useState(false)
  const [errors,  setErrors]  = useState<Partial<typeof INITIAL>>({})
  const [avatar,  setAvatar]  = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function set(k: keyof typeof INITIAL, v: string) {
    setForm((p) => ({ ...p, [k]: v }))
    setErrors((p) => ({ ...p, [k]: undefined }))
    setSaved(false)
  }

  function validate() {
    const e: Partial<typeof INITIAL> = {}
    if (!form.firstName.trim()) e.firstName = "Required"
    if (!form.lastName.trim())  e.lastName  = "Required"
    if (!form.email.includes("@")) e.email  = "Invalid email"
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAvatar(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const initials = `${form.firstName[0] ?? ""}${form.lastName[0] ?? ""}`.toUpperCase()

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Profile</h1>
            <p className="mt-1 text-sm text-[#52525B]">Manage your personal information and preferences</p>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-sm text-[#52525B] hover:bg-[#FAFAF9]">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { setEditing(false); setForm(INITIAL); setErrors({}) }}
                className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-sm text-[#52525B] hover:bg-[#FAFAF9]">
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
              <button onClick={handleSave}
                className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                <Save className="h-3.5 w-3.5" /> Save changes
              </button>
            </div>
          )}
        </div>

        {/* Success banner */}
        {saved && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#059669]">
            <CheckCircle2 className="h-4 w-4" /> Profile updated successfully
          </motion.div>
        )}

        {/* Avatar + basic identity */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#4F46E5]">
                {avatar
                  ? <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                  : <span className="text-2xl font-bold text-white">{initials}</span>
                }
              </div>
              {editing && (
                <>
                  <button onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#4F46E5] text-white shadow hover:bg-[#4338CA]">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                </>
              )}
            </div>

            {/* Name fields */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Field label="First name" value={form.firstName} error={errors.firstName}
                editing={editing} icon={User} onChange={(v) => set("firstName", v)} />
              <Field label="Last name" value={form.lastName} error={errors.lastName}
                editing={editing} icon={User} onChange={(v) => set("lastName", v)} />
              <Field label="Title / Role" value={form.title}
                editing={editing} onChange={(v) => set("title", v)} />
              <Field label="Department" value={form.department}
                editing={editing} onChange={(v) => set("department", v)} />
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Contact</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" value={form.email} error={errors.email}
              editing={editing} icon={Mail} onChange={(v) => set("email", v)} type="email" />
            <Field label="Phone" value={form.phone}
              editing={editing} icon={Phone} onChange={(v) => set("phone", v)} type="tel" />
            <Field label="Location" value={form.location}
              editing={editing} icon={MapPin} onChange={(v) => set("location", v)} />
            <Field label="Website" value={form.website} placeholder="https://"
              editing={editing} icon={Globe} onChange={(v) => set("website", v)} type="url" />
          </div>
        </motion.div>

        {/* Institution */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Institution</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Institution" value={form.institution}
              editing={editing} onChange={(v) => set("institution", v)} />
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Primary role</label>
              {editing ? (
                <select value={form.title} onChange={(e) => set("title", e.target.value)}
                  className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                  {ROLES_DISPLAY.map((r) => <option key={r}>{r}</option>)}
                </select>
              ) : (
                <p className="text-sm text-[#18181B]">{form.title}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Bio</p>
          {editing ? (
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3}
              className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5] resize-none" />
          ) : (
            <p className="text-sm text-[#52525B] leading-relaxed">{form.bio || <span className="text-[#A1A1AA]">No bio added.</span>}</p>
          )}
          {editing && <p className="mt-1.5 text-[11px] text-[#A1A1AA]">{form.bio.length} / 300 characters</p>}
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Preferences</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Timezone</label>
              {editing ? (
                <select value={form.timezone} onChange={(e) => set("timezone", e.target.value)}
                  className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              ) : (
                <p className="text-sm text-[#18181B]">Eastern Time (ET)</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Language</label>
              {editing ? (
                <select value={form.language} onChange={(e) => set("language", e.target.value)}
                  className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              ) : (
                <p className="text-sm text-[#18181B]">English</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="rounded-xl border border-[#FEE2E2] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#DC2626]">Danger Zone</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#18181B]">Delete account</p>
              <p className="text-xs text-[#A1A1AA]">Permanently delete your account and all associated data. This cannot be undone.</p>
            </div>
            <button className="rounded-lg border border-[#FEE2E2] px-4 py-2 text-sm font-medium text-[#DC2626] hover:bg-[#FFF5F5]">
              Delete account
            </button>
          </div>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">FERPA compliant · Data encrypted at rest · Last updated today</p>
      </div>
    </AppShell>
  )
}

interface FieldProps {
  label: string
  value: string
  error?: string
  editing: boolean
  icon?: React.ElementType
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}

function Field({ label, value, error, editing, icon: Icon, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#52525B] mb-1.5">{label}</label>
      {editing ? (
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A1A1AA]" />}
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]",
              Icon && "pl-9",
              error ? "border-[#DC2626]" : "border-[#E8E6E1]"
            )}
          />
        </div>
      ) : (
        <div className={cn("flex items-center gap-2", Icon && "")}>
          {Icon && <Icon className="h-3.5 w-3.5 text-[#A1A1AA] shrink-0" />}
          <p className="text-sm text-[#18181B]">{value || <span className="text-[#A1A1AA]">—</span>}</p>
        </div>
      )}
      {error && <p className="mt-1 flex items-center gap-1 text-[11px] text-[#DC2626]"><AlertCircle className="h-3 w-3" />{error}</p>}
    </div>
  )
}
