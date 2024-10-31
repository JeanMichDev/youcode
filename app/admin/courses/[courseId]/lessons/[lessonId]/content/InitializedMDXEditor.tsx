"use client";
import {
  MDXEditor,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  linkPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  InsertCodeBlock,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  thematicBreakPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import styles from "./mdx-editor-theme.module.css";

// Only import this to the next file
export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      //contentEditableClassName="prose dark:prose-invert"
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  when: (editor) => editor?.editorType === "sandpack",
                  contents: () => <ShowSandpackInfo />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
        linkPlugin(),
      ]}
      {...props}
    />
  );
}
