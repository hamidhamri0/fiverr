// components/RichTextEditor.js

import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import DOMPurify from "dompurify";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Highlight from "@tiptap/extension-highlight";
import React, { useEffect } from "react";

export default function RichTextEditor({ setDescription }) {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, OrderedList, Highlight],
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON(); // Get HTML from the editor
      console.log(json);
      setDescription(json); // Pass this to parent or state handler
    },
  });
  const [sanitizedHTML, setSanitizedHTML] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      const json = await (await fetch("/json/tiptap.json")).json();
      setSanitizedHTML(
        DOMPurify.sanitize(
          generateHTML(json, [
            StarterKit,
            Bold,
            Italic,
            BulletList,
            OrderedList,
            Highlight,
          ]),
        ),
      );
    }
    fetchData();
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg border p-4">
      {/* Editor Toolbar */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded border px-2 py-1 ${editor.isActive("bold") ? "bg-blue-500 text-white" : ""}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded border px-2 py-1 ${editor.isActive("italic") ? "bg-blue-500 text-white" : ""}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`rounded border px-2 py-1 ${editor.isActive("highlight") ? "bg-blue-500 text-white" : ""}`}
        >
          Highlight
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded border px-2 py-1 ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : ""}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded border px-2 py-1 ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : ""}`}
        >
          Ordered List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose lg:prose-xl" />
      {sanitizedHTML && (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedHTML,
          }}
        />
      )}
    </div>
  );
}
