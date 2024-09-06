"use client"
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Debounced function to avoid excessive localStorage writes
const debounce = (func: any, delay: number) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export function Reflection({ questions, autoSave }: { questions: string[]; autoSave: boolean }) {
  const [responses, setResponses] = useState(questions.map(() => ""));
  const [progress, setProgress] = useState(0);

  const saveToLocalStorage = useCallback(
    debounce((newResponses: string[]) => {
      localStorage.setItem("mentalHealthResponses", JSON.stringify(newResponses));
    }, 1000),
    []
  );

  useEffect(() => {
    const savedResponses = localStorage.getItem("mentalHealthResponses");
    if (savedResponses) setResponses(JSON.parse(savedResponses));
  }, []);

  useEffect(() => {
    if (autoSave) saveToLocalStorage(responses);
    setProgress((responses.filter((response) => response.trim() !== "").length / responses.length) * 100);
  }, [responses, autoSave, saveToLocalStorage]);

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSave = () => {
    saveToLocalStorage(responses);
    console.log("Responses saved manually");
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mental Health Reflection</CardTitle>
          <CardDescription>Progress: {Math.round(progress)}%</CardDescription>
        </CardHeader>
      </Card>

      {questions.map((question, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium break-words">{question}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Your response..."
              value={responses[index]}
              onChange={(e) => handleResponseChange(index, e.target.value)}
              rows={4}
              className="w-full"
            />
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full">
        Save Responses
      </Button>
    </div>
  );
}