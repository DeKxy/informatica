import { useRef } from 'react';
import Hero from '../components/Hero';
import ModuleShowcase from '../components/landing/ModuleShowcase';
import LearningExperience from '../components/landing/LearningExperience';
import { LandingStatement, PracticePreview, LandingManifesto, LandingCTA } from '../components/landing/LandingSections';
import { useLandingMotion } from '../components/landing/useLandingMotion';

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useLandingMotion(root);
  return (
    <div className="landing" ref={root}>
      <Hero />
      <LandingStatement />
      <ModuleShowcase />
      <LearningExperience />
      <PracticePreview />
      <LandingManifesto />
      <LandingCTA />
    </div>
  );
}
