"use client";
import { AnxietyManagementSteps } from "@/components/anxiety-management-steps";
import { Reflection } from "@/components/reflection";
import { useState, useEffect, useRef } from "react";
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
const localStorageKey = 'howmaifeeling';

export default function Home() {
  const localStorageInitialised = useRef(false);
  const [state, setState] = useState({
    autoSave: false,
    darkMode: false,
  });
  const { autoSave, darkMode } = state;

  // Set autoSave state
  const setAutoSave = (newAutoSave: boolean) => {
    setState(state => ({ ...state, autoSave: newAutoSave }));
  };

  // Set darkMode state
  const setDarkMode = (newDarkMode: boolean) => {
    setState(state => ({ ...state, darkMode: newDarkMode }));
  };

  // Load settings from localStorage on initial mount
  useEffect(() => {
   
    const savedLocalStorageItem = localStorage.getItem(localStorageKey);
    if (savedLocalStorageItem) {
      try {
        const json = JSON.parse(savedLocalStorageItem);
        if (json) {
          setState(json);
        }
      } catch (err) {
        console.error('Failed to parse localStorage', err);
      }
    }
    if(window.matchMedia('(prefers-color-scheme: dark)')){
      setDarkMode(true)
    }
    // Ensure localStorage is initialized only after loading state
    localStorageInitialised.current = true;
  }, []);

  // Toggle dark mode and update state
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  };

  // Apply dark mode class when the state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className={`p-4 bold ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Welcome to How am I feeling?</h1>
        <Button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="p-2 border rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
{/* Auto-Save Toggle UI */}
<div className="mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={() => {
              setAutoSave(!autoSave)
              localStorage.setItem(localStorageKey, JSON.stringify({ ...state, autoSave: !autoSave }));
            }}
          />
          <Label htmlFor="auto-save">Auto-save responses</Label>
        </div>
      </div>

      <details>
        <summary>Reflect</summary>
        <Reflection
          questions={[
            "How still is your inner world? How peaceful are you inside? How contented are you?",
            "How often do you find yourself truly present in the moment?",
            "What recurring thoughts or worries tend to disrupt your inner peace?",
            "In what ways do you practice self-care, and how effective are these methods for you?",
            "How do you typically respond to setbacks or failures? What does this reveal about your mindset?",
            "What boundaries have you set to protect your mental well-being, and how well do you maintain them?",
            "How does your relationship with social media impact your mental health?",
            "What childhood experiences do you think have shaped your current emotional responses?",
            "How do you balance productivity with rest and relaxation?",
            "What personal narratives or self-talk patterns do you notice in your daily life?",
            "How do your relationships contribute to or detract from your mental health?",
            "What activities or practices help you feel most grounded and centered?",
            "How do you cope with uncertainty and change in your life?",
            "In what ways do you express or suppress your emotions?",
            "How does your physical environment affect your mental state?",
            "What role does forgiveness (of yourself and others) play in your life?"
          ]}
          autoSave={autoSave} // Passing autoSave as a prop
        />
      </details>

      <details>
        <summary>Steps to manage anxiety</summary>
        <AnxietyManagementSteps
          autoSave={autoSave}
          steps={[
            {
              title: "Deep Breathing Exercises",
              description: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat several times.",
              icon: "Heart",
              why: "Activates the parasympathetic nervous system, calming the body and mind."
            },
            {
              title: "Grounding Techniques",
              description: "Use the 5-4-3-2-1 method: Identify 5 things you can see, 4 touch, 3 hear, 2 smell, and 1 taste.",
              icon: "Compass",
              why: "Keeps your focus on the present, pulling you out of anxious thoughts."
            },
            {
              title: "Physical Exercise",
              description: "Engage in any physical activity (walking, running, yoga, etc.) for 20-30 minutes.",
              icon: "Dumbbell",
              why: "Releases endorphins and helps burn off nervous energy."
            },
            {
              title: "Progressive Muscle Relaxation",
              description: "Tense each muscle group for 5 seconds, then release. Start from feet and move upward.",
              icon: "BicepsFlexed",
              why: "Helps your body recognize the difference between tension and relaxation."
            },
            {
              title: "Mindfulness Meditation",
              description: "Focus on your breathing or a simple word. Gently bring your focus back when your mind wanders.",
              icon: "Brain",
              why: "Encourages staying present and accepting thoughts without judgment."
            },
            {
              title: "Limit Stimulants",
              description: "Cut back on caffeine and sugary foods or drinks that can worsen anxiety.",
              icon: "Coffee",
              why: "Stimulants can heighten the body's stress response, making anxiety symptoms more intense."
            },
            {
              title: "Talk it Out",
              description: "Speak to a friend, family member, or therapist about what you're feeling.",
              icon: "MessageCircle",
              why: "Verbalizing your worries can help organize thoughts and gain perspective."
            },
            {
              title: "Journaling",
              description: "Write down your thoughts, worries, or feelings. List anxieties and challenge them.",
              icon: "PenTool",
              why: "Provides an emotional release and helps process what you're going through."
            },
            {
              title: "Visualization",
              description: "Close your eyes and imagine a peaceful place. Focus on the details—sights, sounds, smells.",
              icon: "Mountain",
              why: "Can help distract your mind and promote relaxation."
            },
            {
              title: "Practice Self-Compassion",
              description: "Acknowledge anxiety without judging yourself. Be kind to yourself, as you would a friend.",
              icon: "Heart",
              why: "Helps you treat anxiety as a challenge, not a personal failure."
            }
          ]}
        />
      </details>
    </main>
  );
}
