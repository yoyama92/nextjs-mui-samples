import { messages } from "@/libs/httpStatus";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Container, Paper, Typography } from "@mui/material";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const Errors = ({ status }: { status: number }) => {
  if (!(status in messages)) {
    return <Errors status={StatusCodes.BAD_REQUEST} />;
  }

  const statusCode = messages[status];
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Paper
        sx={{
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom={true}>
          {`${status} ${getReasonPhrase(status)}`}
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          {statusCode.message}
        </Typography>
        {statusCode.action ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={statusCode.action.icon}
            href={statusCode.action.href}
          >
            {statusCode.action.text}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            href="/"
          >
            {"Homeへ"}
          </Button>
        )}
      </Paper>
    </Container>
  );
};
