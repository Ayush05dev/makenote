'use client'
import * as Y from "yjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import React, { FormEvent, useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";


type Language = 
|"hindi"
|"english" 
|"spanish"
|"portuguese"
|"french"
|"russian"
|"japanese"
|"chinese"
|"german"
|"arabic";


const languages : Language[]=[
"hindi",
"english", 
"spanish",
"portuguese",
"french",
"russian",
"japanese",
"chinese",
"german",
"arabic"
];

function TranslateDocument({doc}:{doc:Y.Doc}) {

    const [isOpen,setIsOpen] = useState(false);
    const [language,setLanguage] =useState<string>("")
    const [summary,setSummary] =useState("");
    const [question,setQuestion] =useState("");
    const [isPending,startTransition] =useTransition();



    
    function extractTextFromXml(xmlElement: Y.XmlElement): string {
  let text = "";

  for (const child of xmlElement.toArray()) {
    if (child instanceof Y.XmlElement) {
      text += extractTextFromXml(child); // Recursively extract inner text
    } else if (child instanceof Y.XmlText) {
      text += child.toString();
    }
  }

  return text;
}


    const handleAskQuestion = (e:FormEvent)=>{
        e.preventDefault();
        startTransition(async()=>{
            // const documentData= doc.get("document-store").toJSON();
            const yXmlDoc = doc.get("document-store") as Y.XmlElement;
            const documentData = extractTextFromXml(yXmlDoc); // ✅ Only text content

            // console.log(documentData)
            // console.log("Sending this text for translation:", documentData);

            const res= await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang:language,
                    }),
                }
            );

            if(res.ok){
                // const id=toast.loading("Translating...");
                const{translated_text}=await res.json();
                // console.log("Received translation:", translated_text);


                setSummary(translated_text);
                toast.success("Translated Summary successfully!");
            }
        })
    }

  return (
     <Dialog open={isOpen} onOpenChange={(setIsOpen)} >
        <Button asChild variant="outline" >
           
  <DialogTrigger>
    <LanguagesIcon/> 
    Translate
    </DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Translate the Document</DialogTitle>
      <DialogDescription>
        Select a language and AI will translate a summary of the document in the selected language.
      </DialogDescription>
      <hr className="mt-5" />

        {question && <p className="mt-5 text-gray-500 ">Q:{question} </p>}

    </DialogHeader>

    {
        summary && (
            <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                <div className="felx">
                    <BotIcon className="w-10 flex-shrink-0"/>
                    <p className="font-bold">
                        GPT {isPending ? "is thinking..." : "Says:"}
                    </p>
                </div>
                {/* <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p> */}
                {isPending ? (
                <p>Thinking...</p>
              ) : (
                <div className="prose">
                  <Markdown>{summary}</Markdown>
                </div>
              )}
            </div>
        )
    }

    <form className="flex gap-2" onSubmit={handleAskQuestion} >
        <Select 
        value={language}
        onValueChange={(value)=> setLanguage(value)}
        >
            <SelectTrigger className="w-full"
            >
                <SelectValue placeholder="select a Language" />
            </SelectTrigger>

            <SelectContent>
                {languages.map((language)=>(
                    <SelectItem key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
       
        <Button 
        type="submit"
        disabled={!language || isPending}
        >
        {isPending ? "Translating..." : "Translate"}
        </Button>
    </form>

  </DialogContent>
</Dialog>
  )
}
export default TranslateDocument