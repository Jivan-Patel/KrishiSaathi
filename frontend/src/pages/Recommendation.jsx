import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Info, CheckCircle, ChevronRight, Sprout, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Recommendation = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ soil: '', season: '', water: '' });
    const [results, setResults] = useState([]);
    const [fertilizers, setFertilizers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (results.length > 0) {
            const cropNames = results.map(c => c.name).join(',');
            axios.get(`http://localhost:5000/api/fertilizers?crops=${cropNames}`)
                .then(res => setFertilizers(res.data))
                .catch(err => console.error(err));
        } else {
            setFertilizers([]);
        }
    }, [results]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        const query = new URLSearchParams(formData).toString();
        axios.get(`http://localhost:5000/api/crops/recommendations/filter?${query}`)
            .then(res => {
                setResults(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12 pb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Input Panel */}
                <div className="lg:w-[400px] w-full sticky top-28">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-primary-50 space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 italic tracking-tight">{t('navAdvice')}</h2>
                            <p className="text-gray-500 font-bold mt-2">Get AI-driven crop recommendations for your field.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Field Condition</label>
                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFormData({ ...formData, soil: e.target.value })}
                                    required
                                >
                                    <option value="">Specific Soil Type</option>
                                    {['Alluvial', 'Black', 'Red', 'Loamy', 'Sandy', 'Laterite'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>

                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFormData({ ...formData, season: e.target.value })}
                                    required
                                >
                                    <option value="">Current/Next Season</option>
                                    {['Kharif', 'Rabi', 'Zaid', 'Annual'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>

                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFormData({ ...formData, water: e.target.value })}
                                    required
                                >
                                    <option value="">Water Availability</option>
                                    {['Low', 'Medium', 'High'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <button type="submit" className="w-full btn-premium py-5 flex justify-center items-center gap-3 text-lg group">
                                <TrendingUp size={24} className="group-hover:rotate-12 transition-transform" />
                                Generate Intel
                            </button>
                        </form>

                        <div className="pt-4 flex items-center gap-3 text-gray-400 font-bold text-xs">
                            <Info size={16} /> 100% Data-Driven Recommendations
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 w-full min-h-[500px]">
                    {!searched && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-white rounded-[3rem] border border-primary-50 shadow-sm opacity-60">
                            <Sprout size={100} className="text-primary-100 mb-8" strokeWidth={1} />
                            <h3 className="text-3xl font-black text-primary-900 tracking-tight italic">Waiting for Field Specs</h3>
                            <p className="max-w-xs font-bold text-gray-400 mt-2">Complete the form to unlock your land's full potential.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                            <p className="font-black text-primary-900 italic">Processing Data...</p>
                        </div>
                    )}

                    {searched && !loading && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">{results.length} Optimized Matches</h3>
                                <CheckCircle size={32} className="text-primary-500" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {results.length > 0 ? (
                                    results.map(crop => (
                                        <Link to={`/crops/${crop.id}`} key={crop.id} className="premium-card group hover:bg-primary-50">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h4 className="text-2xl font-black text-gray-900 group-hover:text-primary-900 transition-colors uppercase italic">{crop.name}</h4>
                                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mt-1">High Suitability</p>
                                                </div>
                                                <div className="p-3 bg-white text-primary-600 rounded-xl shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                            <div className="p-6 bg-primary-50/50 rounded-2xl border border-primary-100/50 text-sm font-bold text-gray-600 leading-relaxed italic">
                                                "Recommended based on your soil profile and seasonal water availability."
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="md:col-span-2 bg-white rounded-[3rem] p-20 text-center border border-red-50 shadow-sm">
                                        <h4 className="text-3xl font-black text-red-500 italic mb-4">Incompatible Specs</h4>
                                        <p className="text-gray-500 font-bold max-w-sm mx-auto">None of our current crop models perfectly match these parameters. Try adjusting your water level or soil selection.</p>
                                    </div>
                                )}
                            </div>

                            {/* Recommended Fertilizers for Results */}
                            {results.length > 0 && (
                                <div className="pt-12 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">{t('recommendedInputs')}</h3>
                                        <div className="grow h-px bg-primary-100"></div>
                                    </div>

                                    {fertilizers.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {fertilizers.map(f => (
                                                <div key={f.id} className="premium-card group hover:translate-y-[-4px]">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h4 className="text-xl font-black text-gray-900">{f.name}</h4>
                                                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                            <Sprout size={16} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3 mb-4 text-sm">
                                                        <p className="font-bold text-gray-600 line-clamp-1">{f.nutrients}</p>
                                                        <div className="flex items-center gap-1 text-primary-700 font-black">
                                                            <IndianRupee size={16} />
                                                            <span>{f.pricePerBag} / Bag</span>
                                                        </div>
                                                    </div>
                                                    <Link to="/fertilizers" className="text-xs font-black text-primary-600 uppercase tracking-widest flex items-center gap-2">
                                                        Contact Seller <ChevronRight size={14} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 font-bold italic">{t('noFertilizers')}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Recommendation;
