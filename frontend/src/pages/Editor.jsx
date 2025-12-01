import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import {
  Download,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader2,
  FileText,
  ChevronRight,
  Wand2,
  MessageSquare,
} from "lucide-react";

export default function Editor() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const [refinePrompt, setRefinePrompt] = useState("");
  const [loadingRefine, setLoadingRefine] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [comment, setComment] = useState("");
  const [savingComment, setSavingComment] = useState(false);
  const [feedback, setFeedback] = useState(null); // "like" | "dislike" | null
  const [savingFeedback, setSavingFeedback] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
        if (res.data.sections.length > 0) {
          setActiveSection(res.data.sections[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProject();
  }, [id]);

  // ==========================
  // 🔁 Refine active section
  // ==========================
  const handleRefine = async () => {
    if (!refinePrompt.trim() || !activeSection) return;

    setLoadingRefine(true);
    try {
      const res = await api.post("/generate/refine", {
        section_id: activeSection.id,
        prompt: refinePrompt,
        content: activeSection.content || "",
      });

      const newContent = res.data.content;

      const updatedSections = project.sections.map((s) =>
        s.id === activeSection.id ? { ...s, content: newContent } : s
      );

      setProject({ ...project, sections: updatedSections });
      setActiveSection({ ...activeSection, content: newContent });
      setRefinePrompt("");
    } catch (err) {
      console.error("Refine error:", err);
      alert(
        "Refinement failed: " +
          (err.response?.data?.detail || err.message || "Backend Error")
      );
    } finally {
      setLoadingRefine(false);
    }
  };

  // ==========================
  // 💬 Save comment
  // ==========================
  // 💬 Save comment
const handleSaveComment = async () => {
  if (!activeSection) return;
  setSavingComment(true);
  try {
    await api.post("/feedback/", {
      section_id: activeSection.id,
      comment: comment, // ✅ correct key
    });
    alert("Comment saved");
  } catch (err) {
    console.error(err);
    alert("Failed to save comment");
  } finally {
    setSavingComment(false);
  }
};

// 👍 / 👎 Feedback
const sendFeedback = async (value) => {
  if (!activeSection) return;
  setSavingFeedback(true);
  try {
    await api.post("/feedback/", {
      section_id: activeSection.id,
      is_liked: value === "like", // ✅ backend expects this key
      comment: comment || null, // optional
    });
    setFeedback(value);
  } catch (err) {
    console.error(err);
    alert("Failed to send feedback");
  } finally {
    setSavingFeedback(false);
  }
};


  // ==========================
  // ⬇️ Export
  // ==========================
  const handleExport = async () => {
    if (!project) return;
    setIsExporting(true);
    try {
      const response = await api.get(`/projects/${id}/export`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const ext = project.project_type === "docx" ? "docx" : "pptx";
      link.href = url;
      link.setAttribute("download", `${project.title}.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  if (!project || !activeSection)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-gray-100 font-sans text-gray-900">
      {/* LEFT SIDEBAR */}
      <div className="w-72 flex-none bg-white border-r flex flex-col shadow-sm z-20">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <FileText size={20} />
            <span className="text-xs font-bold uppercase">Document</span>
          </div>
          <h2 className="font-bold text-xl truncate">{project.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {project.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec);
                setComment("");
                setFeedback(null);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeSection.id === sec.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="truncate">{sec.title}</span>
              {activeSection.id === sec.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-medium"
          >
            {isExporting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
            )}
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-gray-100">
        {/* HEADER */}
        <div className="h-16 flex-none bg-white border-b flex items-center justify-between px-8 shadow-sm z-10">
          <h3 className="font-bold text-lg">{activeSection.title}</h3>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => sendFeedback("like")}
              disabled={savingFeedback}
              className={`p-2 rounded-full border ${
                feedback === "like"
                  ? "bg-green-50 text-green-600 border-green-400"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <ThumbsUp size={18} />
            </button>
            <button
              onClick={() => sendFeedback("dislike")}
              disabled={savingFeedback}
              className={`p-2 rounded-full border ${
                feedback === "dislike"
                  ? "bg-red-50 text-red-600 border-red-400"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <ThumbsDown size={18} />
            </button>
          </div>
        </div>

        {/* CONTENT AREA (extra bottom padding so bars don't cover text) */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-xl min-h-[700px] p-12 rounded-sm border border-gray-200 pb-32">
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">
                {activeSection.content || ""}
              </p>
            </div>
          </div>
        </div>

        {/* COMMENT BAR */}
        <div className="flex-none bg-white border-t px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
              <MessageSquare size={16} />
              <span>Your Comment</span>
            </div>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none min-h-[70px]"
              placeholder="Add notes or comments about this section..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleSaveComment}
                disabled={savingComment}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50"
              >
                {savingComment ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span role="img" aria-label="save">
                      💾
                    </span>
                    Save Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* REFINE BAR */}
        <div className="flex-none bg-white border-t p-4 z-20">
          <div className="max-w-3xl mx-auto bg-gray-50 p-1.5 rounded-2xl border flex gap-2 items-center">
            <Wand2 size={20} className="ml-4 text-blue-600" />
            <input
              className="flex-1 p-3 bg-transparent outline-none"
              placeholder="Tell AI how to improve this section..."
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRefine()}
              disabled={loadingRefine}
            />
            <button
              onClick={handleRefine}
              disabled={loadingRefine}
              className="bg-blue-600 text-white p-3 rounded-xl"
            >
              {loadingRefine ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
