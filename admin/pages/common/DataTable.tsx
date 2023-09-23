import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material";
import MaterialTable from "material-table";
import React, { forwardRef } from "react";

const tableIcons: any = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteIcon {...props} ref={ref} color="error" />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => (
    <EditIcon {...props} ref={ref} color="primary" />
  )),
  Export: forwardRef((props: any, ref: any) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

const empList = [
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    phone: 9876543210,
    city: "Bangalore",
  },
  {
    id: 2,
    name: "Raj",
    email: "raj@gmail.com",
    phone: 9812345678,
    city: "Chennai",
  },
  {
    id: 3,
    name: "David",
    email: "david342@gmail.com",
    phone: 7896536289,
    city: "Jaipur",
  },
  {
    id: 4,
    name: "Vikas",
    email: "vikas75@gmail.com",
    phone: 9087654321,
    city: "Hyderabad",
  },
];
interface IDataTableProps {
  data: any;
  columns: any;
  onEdit?: (rowData: any) => void;
}
export default function DataTable(props: IDataTableProps) {
  const { columns, data, onEdit } = props;
  const theme = createTheme();
  let actions = [];
  if (onEdit)
    actions.push({
      icon: tableIcons.Edit,
      tooltip: "Edit",
      onClick: (event: any, rowData: any) =>
        onEdit ? onEdit(rowData) : undefined,
    });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Students information"
          columns={columns}
          data={data}
          icons={tableIcons}
          actions={actions as any}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "rgb(25 118 210)",
              color: "#FFF",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}
