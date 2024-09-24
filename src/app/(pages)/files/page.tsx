import { AuthGuardImage } from "@/components/AuthGuardImage";
import { DownloadButton } from "@/components/DownloadButton";
import { Box } from "@mui/material";

export default () => {
  const files = ["example_file.png"];
  return (
    <Box>
      <AuthGuardImage src={"example_file.png"} width={594} height={366} />
      {files.map((file) => {
        return (
          <DownloadButton href={file} key={file}>
            {file}
          </DownloadButton>
        );
      })}
    </Box>
  );
};
