"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookInfoModalProps {
  title: string;
  authorName: string;
  description: string;
}

export default function BookInfoModal({ title, authorName, description }: BookInfoModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Info Button to Open Modal */}
      <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)}>
        <Info className="w-5 h-5 text-gray-600 hover:text-gray-900" />
      </Button>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">📖 {title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="mt-2">
              <p className="text-gray-700"><strong>Author:</strong> {authorName}</p>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
