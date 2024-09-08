const SupportedBlockType = {
  paragraph: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
} as const;
type BlockType = keyof typeof SupportedBlockType;

import { useCallback, useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $isHeadingNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";

const BlockTypeButton = ({
  blockType,
  type,
  onClick,
}: {
  blockType: BlockType;
  type: HeadingTagType;
  onClick: (type: HeadingTagType) => void;
}) => {
  return (
    <Button
      type="button"
      role="checkbox"
      variant={blockType === type ? "contained" : "outlined"}
      size="small"
      onClick={() => {
        onClick(type);
      }}
      title={SupportedBlockType[type]}
      aria-label={SupportedBlockType[type]}
      aria-checked={blockType === type}
      sx={{
        textTransform: "none",
      }}
    >
      {SupportedBlockType[type]}
    </Button>
  );
};

export const ToolbarPlugin = () => {
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [editor] = useLexicalComposerContext();

  const formatHeading = useCallback(
    (type: HeadingTagType) => {
      if (blockType !== type) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          }
        });
      }
    },
    [blockType, editor],
  );

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isHeadingNode(targetNode)) {
          const tag = targetNode.getTag();
          return setBlockType(tag);
        }

        const nodeType = targetNode.getType();
        if (nodeType in SupportedBlockType) {
          return setBlockType(nodeType as BlockType);
        }
        return setBlockType("paragraph");
      });
    });
  }, [editor]);

  return (
    <Stack direction="row" spacing={1}>
      <BlockTypeButton
        blockType={blockType}
        type="h1"
        onClick={(type) => formatHeading(type)}
      />
      <BlockTypeButton
        blockType={blockType}
        type="h2"
        onClick={(type) => formatHeading(type)}
      />
      <BlockTypeButton
        blockType={blockType}
        type="h3"
        onClick={(type) => formatHeading(type)}
      />
    </Stack>
  );
};
