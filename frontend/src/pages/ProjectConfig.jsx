import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { 
  ArrowLeft, Wand2, Plus, Trash2, Loader2, 
  FileText, Presentation, Sparkles 
} from 'lucide-react';

export default function ProjectConfig() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(searchParams.get('type') ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState(searchParams.get('type') || 'docx');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState('');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setDocType(type);
      setStep(2);
    }
  }, [searchParams]);

  const handleSuggest = async () => {
    if (!topic) return alert('Please enter a topic first');
    setLoading(true);
    try {
      const res = await api.post('/generate/outline', {
        topic,
        project_type: docType
      });

      const outline = Array.isArray(res.data.outline)
        ? res.data.outline
        : Array.isArray(res.data)
        ? res.data
        : [];

      if (!Array.isArray(outline) || outline.length === 0) {
        alert('AI Suggestion returned no outline. Please try again.');
      } else {
        setSections(outline);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        console.error(err);
        alert('AI Suggestion failed. Check backend console.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (sections.length === 0) return alert('Please add at least one section/slide');
    setLoading(true);
    try {
      const res = await api.post('/projects/', {
        title: title || topic,
        project_type: docType,
        sections: sections.map(t => ({ title: t }))
      });
      navigate(`/editor/${res.data.id}`);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        console.error(err);
        alert('Failed to create project. Check backend console.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg text-gray-900">DocuGen AI</h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 && 'Choose Document Type'}
            {step === 2 && 'Configure Project'}
            {step === 3 && 'Structure & Outline'}
          </h2>
          <p className="text-gray-500">
            {step === 1 && 'Select the type of document you want to create'}
            {step === 2 && 'Set up your project details'}
            {step === 3 && 'Define the sections for your document'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {step === 1 && (
            <div className="p-8 grid grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setDocType('docx');
                  setStep(2);
                }}
                className="p-8 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Word Document</h3>
                <p className="text-center text-sm text-gray-500">
                  Create structured reports and essays
                </p>
              </button>

              <button
                onClick={() => {
                  setDocType('pptx');
                  setStep(2);
                }}
                className="p-8 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Presentation size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">PowerPoint</h3>
                <p className="text-center text-sm text-gray-500">
                  Design professional slide decks
                </p>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  placeholder="e.g. Q4 Market Analysis"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Main Topic / Prompt
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none min-h-[120px]"
                  placeholder="e.g. A comprehensive market analysis of the EV industry in 2025..."
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 font-medium px-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!topic}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">
                  {docType === 'pptx' ? 'Slide Titles' : 'Section Headers'}
                </h3>
                <button
                  onClick={handleSuggest}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg border border-purple-100 hover:bg-purple-100 font-medium transition-colors"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                  AI Suggest
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {sections.map((sec, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="text-gray-400 font-mono text-sm w-6">::{idx + 1}</div>
                    <div className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 shadow-sm">
                      {sec}
                    </div>
                    <button
                      onClick={() =>
                        setSections(sections.filter((_, i) => i !== idx))
                      }
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-3">
                  <div className="w-6"></div>
                  <div className="flex-1 flex gap-2">
                    <input
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                      placeholder={
                        docType === 'pptx'
                          ? 'Add Slide Title...'
                          : 'Add Section Header...'
                      }
                      value={newSection}
                      onChange={e => setNewSection(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newSection) {
                          setSections([...sections, newSection]);
                          setNewSection('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newSection) {
                          setSections([...sections, newSection]);
                          setNewSection('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-500 hover:text-gray-900 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={loading || sections.length === 0}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={18} /> Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
