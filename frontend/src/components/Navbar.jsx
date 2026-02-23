import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sprout, Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [showLangMenu, setShowLangMenu] = useState(false);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'gu', label: 'ગુજરાતી' },
        { code: 'bn', label: 'বাংলা' },
        { code: 'mr', label: 'मराठी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'pa', label: 'ਪੰਜਾਬੀ' }
    ];

    return (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-100 py-4 px-6 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                        <Sprout className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-black text-primary-900 tracking-tight">KrishiSaathi</span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-sm font-bold">
                    <NavLink to="/" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navHome')}</NavLink>
                    <NavLink to="/crops" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navCrops')}</NavLink>
                    <NavLink to="/recommendation" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navAdvice')}</NavLink>
                    <NavLink to="/fertilizers" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navInputs')}</NavLink>
                    <NavLink to="/community" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navForum')}</NavLink>
                    <NavLink to="/mandi-rates" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navMarket')}</NavLink>
                    <NavLink to="/sell" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-primary-400'}`}>{t('navBuyers')}</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/transport" className="hidden sm:flex btn-premium py-2 px-6 text-sm">
                        {t('navTransport')}
                    </Link>

                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowLangMenu(true)}
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="flex items-center gap-2 p-2 px-3 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors font-bold text-xs"
                        >
                            <Languages size={18} />
                            <span className="uppercase">{language}</span>
                            <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showLangMenu && (
                            <div
                                onMouseLeave={() => setShowLangMenu(false)}
                                className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-primary-50 py-2 overflow-hidden z-60"
                            >
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            toggleLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-primary-50 text-sm font-bold transition-colors ${language === lang.code ? 'text-primary-600 bg-primary-50/50' : 'text-gray-600'}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

