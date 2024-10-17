"use client";
import Highlight from "@tiptap/extension-highlight";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import React from "react";
export default function AboutGig({ aboutGig }: { aboutGig: any }) {
  return (
    <div className="mb-12" id="AboutGig">
      <h3 className="mb-4 text-xl font-semibold text-gray-700">About Gig</h3>
      {aboutGig && (
        <div
          className="json-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              generateHTML(aboutGig, [
                StarterKit.configure({
                  bulletList: {
                    HTMLAttributes: {
                      class: "custom-bullet-list list-decimal pl-4",
                    },
                  },
                  orderedList: {
                    HTMLAttributes: {
                      class: "custom-ordered-list list-disc pl-4",
                    },
                  },
                }),
                Highlight,
              ]),
            ),
          }}
        ></div>
      )}
    </div>
  );
}
