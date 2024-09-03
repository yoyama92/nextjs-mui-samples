"use client";

import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { addMinutes, format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";

const columns: GridColDef<Notification>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "タイトル",
  },
  {
    field: "content",
    headerName: "本文",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "作成日時（日本時間）",
    type: "string",
    valueFormatter: (value?: string) => {
      if (value) {
        const date = new Date(value);
        return format(
          addMinutes(date, 9 * 540 + date.getTimezoneOffset()),
          "yyyy/MM/dd HH:mm:ss",
        );
      }
    },
    width: 160,
  },
  {
    field: "updatedAt",
    headerName: "更新日時（日本時間）",
    type: "string",
    valueFormatter: (value?: string) => {
      if (value) {
        const date = new Date(value);
        return format(
          addMinutes(date, 9 * 540 + date.getTimezoneOffset()),
          "yyyy/MM/dd HH:mm:ss",
        );
      }
    },
    width: 160,
  },
];

type Notification = {
  id: number;
  content: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  users: {
    id: number;
    read: boolean;
    name?: string;
  }[];
};

export const NotificationTable = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  const apiRef = useGridApiRef();

  return (
    <Box
      sx={{
        height: 600,
        maxWidth: 1000,
        backgroundColor: "white",
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Stack spacing={1} direction="row">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          onClick={() => {
            apiRef.current.updateRows([
              { id: apiRef.current.getRowsCount() + 1 },
            ]);
          }}
        >
          行追加
        </Button>
      </Stack>
      <DataGrid
        apiRef={apiRef}
        rows={notifications}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        autosizeOptions={{
          includeOutliers: true,
          includeHeaders: false,
        }}
        getRowHeight={() => "auto"}
        pageSizeOptions={[5, 10, 50]}
        disableRowSelectionOnClick={true}
        sx={{
          border: 0,
        }}
      />
    </Box>
  );
};
