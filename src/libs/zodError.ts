import { z, type ZodIssueOptionalMessage } from "zod";

const getErrorMessage = (issue: ZodIssueOptionalMessage) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small: {
      switch (issue.type) {
        case "array": {
          return `${issue.minimum}つ以上の選択が必須です。`;
        }
        case "string": {
          return `最小文字数(${issue.minimum}文字)を満たしていません。`;
        }
      }
      break;
    }
    case z.ZodIssueCode.too_big: {
      switch (issue.type) {
        case "string": {
          return `最大文字数(${issue.maximum}文字)を満たしていません。`;
        }
      }
      break;
    }
  }
};

export const useErrorMap = () => {
  z.setErrorMap((issue, ctx) => {
    const message = getErrorMessage(issue) ?? ctx.defaultError;
    return {
      message: message,
    };
  });
};
