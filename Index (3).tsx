import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArtHeroSection } from "@/components/sections/ArtHeroSection";
import { ArtDefinitionSection } from "@/components/sections/ArtDefinitionSection";
import { ArtTypesSection } from "@/components/sections/ArtTypesSection";
import { ArtWorkshopSection } from "@/components/sections/ArtWorkshopSection";
import { ArtJoinSection } from "@/components/sections/ArtJoinSection";
import { ProgressBar } from "@/components/ProgressBar";
import { NavigationDots } from "@/components/NavigationDots";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

const sections = [
  ArtHeroSection,
  ArtDefinitionSection,
  ArtTypesSection,
  ArtWorkshopSection,
  ArtJoinSection,
];

const SECTION_DURATION = 10000; // 10 seconds

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, SECTION_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, currentSection]);

  const handleNavigate = (index: number) => {
    setCurrentSection(index);
  };

  const CurrentSectionComponent = sections[currentSection];

  return (
    <div className="relative min-h-screen bg-gradient-dark overflow-hidden">
      <ProgressBar progress={currentSection} total={sections.length} />
      
      <NavigationDots
        total={sections.length}
        current={currentSection}
        onNavigate={handleNavigate}
      />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsPaused(!isPaused)}
          className="bg-card/80 backdrop-blur-lg border-primary/50 hover:bg-card hover:border-primary transition-all glow-primary"
        >
          {isPaused ? (
            <>
              <Play className="w-5 h-5 mr-2" />
              <span>تشغيل</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 mr-2" />
              <span>إيقاف</span>
            </>
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <CurrentSectionComponent key={currentSection} />
      </AnimatePresence>
    </div>
  );
};

export default Index;
