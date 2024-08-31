import { Box, Link } from "@mui/material";
import Image from "next/image";

export default () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6rem",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "inherit",
          justifyContent: "inherit",
          alignItems: "inherit",
          fontSize: "0.85rem",
          maxWidth: "100%",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
        }}
      >
        <Box component="p">
          Get started by editing&nbsp;
          <Box
            component="code"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            src/app/page.tsx
          </Box>
        </Box>
        <Box>
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority={true}
            />
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.85rem",
          position: "relative",
          padding: "4rem 0;",
        }}
      >
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority={true}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(25%, auto))",
          maxWidth: "100%",
          width: "var(--max-width)",
          gap: "0.5rem",
        }}
      >
        <Link
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box component="h2">
            Docs <Box component="span">-&gt;</Box>
          </Box>
          <Box component="p">
            Find in-depth information about Next.js features and API.
          </Box>
        </Link>
        <Link
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box component="h2">
            Learn <Box component="span">-&gt;</Box>
          </Box>
          <Box component="p">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </Box>
        </Link>

        <Link
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box component="h2">
            Templates <Box component="span">-&gt;</Box>
          </Box>
          <Box component="p">Explore starter templates for Next.js.</Box>
        </Link>

        <Link
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box component="h2">
            Deploy <Box component="span">-&gt;</Box>
          </Box>
          <Box component="p">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </Box>
        </Link>
      </Box>
    </Box>
  );
};
