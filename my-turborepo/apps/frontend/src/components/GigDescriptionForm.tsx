"use client";
import { useFormContext, useController } from "react-hook-form";
import { generateHTML } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";

import Highlight from "@tiptap/extension-highlight";
import React from "react";

export default function GigDescriptionForm() {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
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
  const {
    field: { onChange: onChangeJson, value: jsonContent },
  } = useController({
    name: "editorJson",
    control,
    defaultValue: "",
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
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
    ],
    content: jsonContent,

    editorProps: {
      attributes: {
        class:
          "min-w-full prose lg:prose-xl min-h-[200px] max-h-[200px] rounded-b-lg border-2 border-black outline-none overflow-y-auto p-2 custom-scrollbar",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const json = editor.getJSON();
      onChangeJson(json);
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
        {error && <p className="mb-4 text-sm text-red-500">{error.message}</p>}
        <div>
          {jsonContent && (
            <div
              className="json-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  generateHTML(jsonContent, [StarterKit, Highlight]),
                ),
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
