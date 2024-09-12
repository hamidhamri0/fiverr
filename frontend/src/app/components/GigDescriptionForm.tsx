import { useFormContext, useController } from "react-hook-form";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Highlight from "@tiptap/extension-highlight";
import React, { useEffect, useState } from "react";
import { FaBold, FaItalic } from "react-icons/fa";
import { LuHighlighter } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { RiListOrdered } from "react-icons/ri";

function ToolBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;
  return (
    <div className="flex space-x-2 rounded-t-lg border-l-2 border-r-2 border-t-2 border-black p-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded border px-2 py-1 ${editor.isActive("bold") ? "bg-blue-500 text-white" : ""}`}
      >
        <FaBold size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded border px-2 py-1 ${editor.isActive("italic") ? "bg-blue-500 text-white" : ""}`}
      >
        <FaItalic size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`rounded border px-2 py-1 ${editor.isActive("highlight") ? "bg-blue-500 text-white" : ""}`}
      >
        <LuHighlighter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded border px-2 py-1 ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : ""}`}
      >
        <MdFormatListBulleted size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded border px-2 py-1 ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : ""}`}
      >
        <RiListOrdered size={20} />
      </button>
    </div>
  );
}

export default function GigDescriptionForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name: "editor",
    control,
    defaultValue: "",
    rules: {
      required: "Description is required",
      minLength: { value: 120, message: "Description is too short" },
      maxLength: { value: 1200, message: "Description is too long" },
    },
  });

  // console.log(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Highlight],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-w-full prose lg:prose-xl min-h-[200px] max-h-[200px] rounded-b-lg border-2 border-black outline-none overflow-y-auto p-2 custom-scrollbar",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const json = editor.getJSON();
      onChange(text);
      if (text.length > 1200) {
        const overflow = text.length - 1200;
        editor.commands.deleteRange({
          from: editor.state.selection.from - overflow,
          to: editor.state.selection.from,
        });
      }
    },
  });

  return (
    <div>
      <div className="mb-12">
        <ToolBar editor={editor} />
        <EditorContent
          editor={editor}
          className="prose mb-2 min-w-full lg:prose-xl"
        />
        <div className="flex justify-end text-sm">
          <p>{value.length} / 1200 Characters</p>
        </div>
        {errors.editor && (
          <p className="mb-4 text-sm text-red-500">{errors.editor.message}</p>
        )}
      </div>
    </div>
  );
}
