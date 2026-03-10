"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect, useRef } from "react";

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  token: string;
  placeholder?: string;
}

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
        active ? "bg-purple-500/30 text-purple-300" : "text-white/40 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichEditor({ content, onChange, token, placeholder }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder || "상세 내용을 작성하세요..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[200px] px-4 py-3 focus:outline-none " +
          "prose-headings:text-white prose-p:text-white/70 prose-strong:text-white " +
          "prose-a:text-purple-400 prose-img:rounded-xl prose-img:my-4",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleImageUpload = useCallback(
    async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.url && editor) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    },
    [editor, token]
  );

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL을 입력하세요:");
    if (!url) return;
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-white/10 bg-white/[0.02]">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="굵게"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울임"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="밑줄"
        >
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="취소선"
        >
          <s>S</s>
        </ToolbarButton>

        <span className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="제목"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="소제목"
        >
          H3
        </ToolbarButton>

        <span className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="목록"
        >
          &bull; List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="번호 목록"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="인용"
        >
          &ldquo; Quote
        </ToolbarButton>

        <span className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton active={editor.isActive("link")} onClick={addLink} title="링크">
          Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          title="이미지 업로드"
        >
          Image
        </ToolbarButton>

        <span className="w-px h-5 bg-white/10 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="구분선"
        >
          ―
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
