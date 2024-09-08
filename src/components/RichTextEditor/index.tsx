"use client";

import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin as LexicalOnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { Box } from "@mui/material";
import type { EditorState } from "lexical";
import type { ComponentProps } from "react";
import { ToolbarPlugin } from "./plugins/ToobarPlugin";

const OnChangePlugin = ({
  onChange,
}: { onChange: (value: string) => void }) => {
  const [editor] = useLexicalComposerContext();
  const handleChange = (editorState: EditorState) => {
    const html = editorState.read(() => $generateHtmlFromNodes(editor));
    onChange(html);
  };

  return <LexicalOnChangePlugin onChange={handleChange} />;
};

export const RichTextEditor = ({
  onChange,
}: { onChange: (value: string) => void }) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] =
    {
      namespace: "MyEditor",
      onError: (error) => {
        console.error(error);
      },
      nodes: [HeadingNode],
    };
  return (
    <Box>
      <Box component={LexicalComposer} initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <Box
              component={ContentEditable}
              sx={{
                outline: "none",
                paddingTop: 2,
              }}
            />
          }
          placeholder={
            <Box
              sx={{
                position: "relative",
                color: "#888888",
                top: "-1.5em",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              入力
            </Box>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleChange} />
      </Box>
    </Box>
  );
};
