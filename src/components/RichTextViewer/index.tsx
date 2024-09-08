import { Box, ScopedCssBaseline, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Script from "next/script";

export const RichTextViewer = ({ children }: { children: string }) => {
  return (
    <ScopedCssBaseline>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, children, ref, ...props }) => (
            <Typography
              {...props}
              component="h2"
              variant="h1"
              sx={{
                marginTop: 5,
                marginBottom: 2,
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ node, children, ref, ...props }) => (
            <Typography
              {...props}
              component="h3"
              variant="h2"
              sx={{
                marginTop: 5,
                marginBottom: 2,
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ node, children, ref, ...props }) => (
            <Typography
              {...props}
              component="h4"
              variant="h3"
              sx={{
                marginTop: 5,
                marginBottom: 2,
              }}
            >
              {children}
            </Typography>
          ),
          p: ({ node, children, ref, ...props }) => (
            <Typography
              {...props}
              component="p"
              variant="body1"
              sx={{
                marginTop: 1,
                marginBottom: 2,
              }}
            >
              {children}
            </Typography>
          ),
          s: ({ node, children, ref, ...props }) => {
            return (
              <Typography {...props} component="s">
                {children}
              </Typography>
            );
          },
          strong: ({ node, children, ref, ...props }) => {
            return (
              <Typography {...props} component="strong" fontWeight="bold">
                {children}
              </Typography>
            );
          },
          blockquote: ({ node, children, ref, ...props }) => {
            return (
              <Box component="blockquote" {...props}>
                {children}
              </Box>
            );
          },
          script: ({ node, ...props }) => {
            return <Script {...props} />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </ScopedCssBaseline>
  );
};
