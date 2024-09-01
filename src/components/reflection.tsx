"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Reflection({ questions }: { questions: string[]}) {

  const [responses, setResponses] = useState(questions.map(() => ""))
  const [autoSave, setAutoSave] = useState(false)

  useEffect(() => {
    // Load saved responses and auto-save state from localStorage on component mount
    const savedResponses = localStorage.getItem('mentalHealthResponses')
    const savedAutoSave = localStorage.getItem('autoSave')
    
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses))
    }
    
    if (savedAutoSave) {
      setAutoSave(JSON.parse(savedAutoSave))
    }
  }, [])

  useEffect(() => {
    // Save responses to localStorage when they change, if autoSave is enabled
    if (autoSave) {
      localStorage.setItem('mentalHealthResponses', JSON.stringify(responses))
    }
  }, [responses, autoSave])

  useEffect(() => {
    // Save autoSave state to localStorage when it changes
    localStorage.setItem('autoSave', JSON.stringify(autoSave))
  }, [autoSave])

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  const handleSave = () => {
    localStorage.setItem('mentalHealthResponses', JSON.stringify(responses))
    console.log("Responses saved manually")
  }

  const toggleAutoSave = () => {
    setAutoSave(!autoSave)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mental Health Reflection</CardTitle>
          <CardDescription>
            Take your time to reflect on these questions. Your responses are saved locally and not shared.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="auto-save" checked={autoSave} onCheckedChange={toggleAutoSave} />
            <Label htmlFor="auto-save">Auto-save responses</Label>
          </div>
        </CardContent>
      </Card>
      {questions.map((question, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium break-words">
              {question}
            </CardTitle>
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
      <Button onClick={handleSave} className="w-full">Save Responses</Button>
    </div>
  )
}