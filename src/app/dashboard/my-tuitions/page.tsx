"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  BookOpen, 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink,
  Sparkles,
  ArrowLeft
} from "lucide-react";

interface TuitionItem {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  schedule: string;
  fee: string;
  applicantsCount: number;
  status: "Active & Approved" | "Pending Review";
}

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState<TuitionItem[]>([
    {
      id: "1",
      title: "HSC Higher Math & Engineering Admission Prep",
      subject: "Higher Mathematics",
      classLevel: "Class 11-12 & Admission",
      mode: "Online Batch",
      location: "Online / Pan Bangladesh",
      schedule: "3 days / week",
      fee: "4,500",
      applicantsCount: 5,
      status: "Active & Approved",
    },
    {
      id: "2",
      title: "Class 9-10 Physics & General Science Foundation",
      subject: "Physics",
      classLevel: "Class 9-10 (SSC)",
      mode: "Offline Tuition",
      location: "Dhanmondi, Dhaka",
      schedule: "3 days / week",
      fee: "6,000",
      applicantsCount: 2,
      status: "Active & Approved",
    },
    {
      id: "3",
      title: "Cambridge O / A-Level Chemistry & Past Papers",
      subject: "Chemistry",
      classLevel: "O-Level / A-Level",
      mode: "Online Batch",
      location: "Online / Pan Bangladesh",
      schedule: "2 days / week",
      fee: "8,000",
      applicantsCount: 1,
      status: "Active & Approved",
    },
  ]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove listing "${name}"?`)) {
      setTuitions((prev) => prev.filter((item) => item.id !== id));
      toast.success("Tuition listing removed successfully");
    }
  };

  const handleToggleStatus = (id: string) => {
    setTuitions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active & Approved"
                  ? "Pending Review"
                  : "Active & Approved",
            }
          : item
      )
    );
    toast.success("Listing status updated!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7679] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF1E40] mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1C0307] border border-[#F2B8C4] dark:border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#D91E48] dark:text-[#FF1E40] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COURSE MANAGEMENT</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight mt-2">
            My Tuitions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Edit active listings, monitor applicants, and track batch status.
          </p>
        </div>

        <Link
          href="/dashboard/post-tuition"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.25)] transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* Tuitions Grid */}
      {tuitions.length === 0 ? (
        <div className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-12 text-center shadow-sm">
          <BookOpen className="w-10 h-10 text-[#8C7679] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#180C0E] dark:text-white">
            No tuitions created yet
          </h3>
          <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Post your first tuition course to start receiving applicants from students!
          </p>
          <Link
            href="/dashboard/post-tuition"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D91E48] text-white font-bold text-xs shadow-sm hover:bg-[#B31438] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Post</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col justify-between hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-all"
            >
              <div>
                {/* Header row: mode & status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30">
                    {item.mode}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(item.id)}
                    title="Click to toggle status"
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase cursor-pointer transition-all ${
                      item.status === "Active & Approved"
                        ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/40"
                        : "bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40"
                    }`}
                  >
                    {item.status === "Active & Approved" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    <span>{item.status}</span>
                  </button>
                </div>

                {/* Title & Subject */}
                <h3 className="text-sm font-bold text-[#180C0E] dark:text-white line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D91E48] dark:text-[#FF1E40] font-semibold mt-1">
                  {item.classLevel}
                </p>

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-[#5C494C] dark:text-[#BFA5AA] pt-3 border-t border-[#EADCDD] dark:border-[#E11D48]/20">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8C7679] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8C7679] shrink-0" />
                    <span>{item.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D91E48] shrink-0" />
                    <span className="font-semibold text-[#180C0E] dark:text-white">
                      {item.applicantsCount} Applicants
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Fee & Actions */}
              <div className="mt-5 pt-3 border-t border-[#EADCDD] dark:border-[#E11D48]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8C7679] block">
                    Monthly Fee
                  </span>
                  <span className="text-sm font-black text-[#D91E48] dark:text-[#FF1E40]">
                    ৳{item.fee}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href="/dashboard/applicants"
                    className="p-2 rounded-lg bg-[#F5ECEC] dark:bg-[#2A060C] text-[#180C0E] dark:text-white hover:text-[#D91E48] dark:hover:text-[#FF1E40] hover:bg-[#EADCDD] transition-colors"
                    title="View Applicants"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 rounded-lg bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] hover:bg-[#F2B8C4] transition-colors cursor-pointer"
                    title="Delete listing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}