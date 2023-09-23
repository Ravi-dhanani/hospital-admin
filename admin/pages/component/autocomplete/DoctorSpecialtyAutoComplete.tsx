import * as React from "react";
import ApiServices from "@/pages/services/Apiservices";
import IDepartment from "@/pages/types/department";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import IDoctor from "@/pages/types/doctor";

import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
interface IDoctorSpecialtyAutoCompleteProps {
  specialty: any;
  setSpecialty: React.Dispatch<any>;
  objForm: UseFormReturn<IDoctor, any>;
  objDoctor?: IDoctor;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  doctorSpecialty: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      doctorSpecialty.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DoctorSpecialtyAutoComplete(
  props: IDoctorSpecialtyAutoCompleteProps
) {
  const theme = useTheme();
  const [lstDepartment, setLstDepartment] = React.useState<IDepartment | any>(
    []
  );

  React.useEffect(() => {
    const loadData = async () => {
      const res = await ApiServices.getLstDepartment();
      setLstDepartment(res);
    };
    loadData();
  }, []);
  return (
    <div>
      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        options={lstDepartment}
        getOptionLabel={(option: any) => option.DepartmentName}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Department"
            error={props.objForm.formState.errors.FirstName ? true : false}
          />
        )}
        onChange={(_, data) => {
          props.setSpecialty(data);
        }}
        defaultValue={props.objDoctor?.Specialty.map(
          (item: IDepartment) => item
        )}
      />
      <FormHelperText style={{ color: "red" }}>
        {props.objForm.formState.errors.Specialty?.message}
      </FormHelperText>
    </div>
  );
}
