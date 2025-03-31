"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookContentProps {
  chapters: { title: string; content: any }[];
}

export default function BookContent({ chapters }: BookContentProps) {
  const [selectedChapter, setSelectedChapter] = useState(0);

  return (
    <div className="w-full h-screen max-h-[80vh] border overflow-y-scroll">
      {/* Small Screen: Dropdown for Chapters */}
      <div className="md:hidden p-4">
        <h2 className="text-xl font-bold mb-2">Chapters</h2>
        <Select onValueChange={(value) => setSelectedChapter(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter, index) => (
              <SelectItem key={index} value={index.toString()}>
                {chapter.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Large Screen: Resizable Layout */}
      <div className="hidden md:flex w-full h-full">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          {/* Sidebar for Chapter List (Hidden on Small Screens) */}
          <ResizablePanel defaultSize={15} minSize={10} maxSize={30} className="hidden md:block">
            <div className="p-4 h-full overflow-y-auto">
              <h2 className="text-xl font-bold mb-2">Chapters</h2>
              <ul>
                {chapters.map((chapter, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer ${
                      selectedChapter === index ? "font-bold text-blue-600" : ""
                    }`}
                    onClick={() => setSelectedChapter(index)}
                  >
                    {chapter.title}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>

          {/* Handle for Resizing */}
          <ResizableHandle className=" w-1 cursor-ew-resize hidden md:block" />

          {/* Content Display (Make Full Width on Small Screens) */}
          <ResizablePanel defaultSize={70} minSize={60} maxSize={100} className="w-full">
            <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300">
              <h2 className="text-2xl font-bold">{chapters[selectedChapter].title}</h2>
              <div className="mt-2">
                <PortableText value={chapters[selectedChapter].content} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Small Screen: Content (Ensures Proper Width & No Overflow) */}
      <div className="md:hidden p-4 w-full">
        <h2 className="text-2xl font-bold">{chapters[selectedChapter].title}</h2>
        <div className="mt-2">
          <PortableText value={chapters[selectedChapter].content} />
        </div>
      </div>
    </div>
  );
}
