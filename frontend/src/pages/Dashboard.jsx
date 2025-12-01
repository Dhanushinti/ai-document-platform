import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { FileText, Presentation, Plus, Search, Clock, FileType } from 'lucide-react';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    api.get('/projects/')
       .then(res => setProjects(res.data))
       .catch(err => console.error("Load failed", err))
       .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><FileType size={20} /></div>
            OceanAI
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300" />
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div><h1 className="text-3xl font-bold text-gray-900">My Projects</h1><p className="text-gray-500 mt-1">Manage and edit your AI-generated documents.</p></div>
            <Link to="/create" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={20} /> New Project</Link>
        </div>

        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-8 max-w-md flex items-center gap-2">
            <Search className="text-gray-400 ml-3" size={20} />
            <input className="flex-1 p-2 outline-none text-gray-700 placeholder-gray-400" placeholder="Search projects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        {loading ? <div className="text-center py-10">Loading...</div> : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(p => (
                <Link key={p.id} to={`/editor/${p.id}`} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${p.project_type === 'docx' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                            {p.project_type === 'docx' ? <FileText size={24} /> : <Presentation size={24} />}
                        </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">{p.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
                        <span className="uppercase tracking-wider">{p.project_type}</span> • <span className="flex items-center gap-1"><Clock size={12} /> {new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 className="text-lg font-bold text-gray-900">No projects found</h3>
                <Link to="/create" className="text-blue-600 font-bold hover:underline">Create New Project</Link>
            </div>
        )}
      </div>
    </div>
  );
}