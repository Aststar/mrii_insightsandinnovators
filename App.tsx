
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import PodcastPlatforms from './components/PodcastPlatforms';
import FeaturedEpisodes from './components/FeaturedEpisodes';
import DeepDiveSEO from './components/DeepDiveSEO';
import KnowledgeVault from './components/KnowledgeVault';
import CertificationRoadmap from './components/CertificationRoadmap';
import LeadMagnetForm from './components/LeadMagnetForm';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import AllEpisodes from './components/AllEpisodes';
import EpisodePage from './components/EpisodePage';

const LandingPage: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-trigger');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="flex-grow">
        <Hero />

        <div className="scroll-trigger opacity-0 transition-opacity duration-700 ease-out [&.animate-in]:opacity-100">
          <PodcastPlatforms />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <FeaturedEpisodes />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <KnowledgeVault />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <DeepDiveSEO />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <CertificationRoadmap />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <LeadMagnetForm />
        </div>

        <div className="scroll-trigger opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          <Benefits />
        </div>
      </main>

      <style>{`
        .scroll-trigger.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary overflow-x-hidden bg-white">
      <Routes>
        {/* Local dev / preview convenience: bounce root to the canonical listing URL */}
        <Route path="/" element={<Navigate to="/insights-innovators-new" replace />} />
        <Route path="/insights-innovators-new" element={<LandingPage />} />
        <Route path="/insights-innovators-new/allepisodes" element={
          <main className="flex-grow">
            <AllEpisodes />
          </main>
        } />
        <Route path="/podcast/:slug" element={
          <main className="flex-grow">
            <EpisodePage />
          </main>
        } />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
