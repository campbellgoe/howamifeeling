import { Reflection } from "@/components/reflection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Reflection questions={[
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
  ]}/>
    </main>
  )
  
}
