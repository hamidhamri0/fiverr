import { useEditor } from "@tiptap/react";
import { FaBold, FaItalic } from "react-icons/fa";
import { LuHighlighter } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { RiListOrdered } from "react-icons/ri";

export default function ToolBar({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
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
