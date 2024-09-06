"use client"
import {
  Compass,
  Dumbbell,
  Brain,
  Coffee,
  MessageCircle,
  PenTool,
  Mountain,
  Heart,
  BicepsFlexed,
  Plus,
  Trash2,
} from "lucide-react";
import { FC, useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Icons: { [key: string]: FC<any> } = { Compass, Dumbbell, Brain, Coffee, MessageCircle, PenTool, Mountain, Heart, BicepsFlexed };

const localStorageKey = 'howamifeeling.manage-anxiety.checkboxes';

type CheckboxItem = {
  id: string;
  timestamp: string;
  checked: boolean;
  text: string;
};

export function AnxietyManagementSteps({ steps, autoSave }: { steps: any[]; autoSave: boolean }) {
  const [checkboxes, setCheckboxes] = useState<{ [key: number]: CheckboxItem[] }>({});
  const prevCheckboxes = useRef(checkboxes);

  // Debounced function to avoid excessive localStorage writes
  const debounce = (func: any, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const saveToLocalStorage = useCallback(
    debounce((newCheckboxes: any) => {
      localStorage.setItem(localStorageKey, JSON.stringify(newCheckboxes));
    }, 1000),
    []
  );

  useEffect(() => {
    const storedCheckboxes = localStorage.getItem(localStorageKey);
    if (storedCheckboxes) {
      setCheckboxes(JSON.parse(storedCheckboxes));
    }
  }, []);

  useEffect(() => {
    if (autoSave && checkboxes !== prevCheckboxes.current) {
      prevCheckboxes.current = checkboxes;
      saveToLocalStorage(checkboxes);
    }
  }, [checkboxes, autoSave, saveToLocalStorage]);

  const addCheckbox = (stepIndex: number) => {
    const newCheckbox: CheckboxItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      checked: false,
      text: "",
    };
    setCheckboxes((prev) => ({
      ...prev,
      [stepIndex]: [...(prev[stepIndex] || []), newCheckbox],
    }));
  };

  const toggleCheckbox = (stepIndex: number, checkboxId: string) => {
    setCheckboxes((prev) => ({
      ...prev,
      [stepIndex]: prev[stepIndex].map((checkbox) =>
        checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
      ),
    }));
  };

  const onDeleteCheckbox = (index: number, checkboxId: CheckboxItem["id"]) => {
    setCheckboxes((prev) => ({
      ...prev,
      [index]: (prev[index] || []).filter((checkbox) => checkbox.id !== checkboxId),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Steps to Lessen Anxiety</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((Step, index) => {
          const Icon = Icons[Step.icon as string];
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center">
                  <Icon className="h-6 w-6 text-primary" aria-label={Step.title} />
                  <CardTitle>{Step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-2">{Step.description}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why it helps:</strong> {Step.why}
                </p>
              </CardContent>
              <div className="mt-4 p-4">
                <div className="mt-2 space-y-2">
                  {checkboxes[index]?.map((checkbox) => (
                    <div key={checkbox.id} className="flex items-center">
                      <Checkbox
                        id={checkbox.id}
                        checked={checkbox.checked}
                        onCheckedChange={() => toggleCheckbox(index, checkbox.id)}
                        aria-label={`Mark ${Step.title} as completed`}
                      />
                      <input
                        type="text"
                        placeholder="Note"
                        value={checkbox.text}
                        onChange={(e) =>
                          setCheckboxes((prev) => ({
                            ...prev,
                            [index]: prev[index].map((checkboxItem) =>
                              checkboxItem.id === checkbox.id ? { ...checkboxItem, text: e.target.value } : checkboxItem
                            ),
                          }))
                        }
                        className="ml-2 p-1 border border-gray-300 rounded text-black"
                      />
                      <button
                        onClick={() => {
                          const confirmed = confirm("Delete note? \""+checkbox.text+"\"")
                          if(confirmed) onDeleteCheckbox(index, checkbox.id)
                        }}
                        aria-label="Delete note"
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addCheckbox(index)}
                  className="flex items-center mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add note
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}