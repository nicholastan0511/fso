import { useState } from "react";
import { Diagnosis } from "../types";
import { FormControlLabel, Checkbox } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<Diagnosis['code'][]>>;
}

const DiagnosisForm = ({ diagnoses, setDiagnosisCodes } : Props) => {  
  type DiagnosisCheck = {
    [key: string]: boolean;
  };

  const diagnosesCheck: DiagnosisCheck = {}
  diagnoses.forEach(diagnosis => 
    diagnosesCheck[diagnosis.code] = false
  )

  const [checkedItems, setCheckedItems] = useState({
    ...diagnosesCheck
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked });
    const checked: string[] = [];
    Object.entries(checkedItems).forEach(([key, value]) => {
      if (value)
        checked.push(key);
    });

    if (e.target.checked)
      checked.push(e.target.name)
    setDiagnosisCodes(checked);
  };

  return (
    <div>
      {diagnoses.map(diagnosis => (
        <FormControlLabel
          control={<Checkbox checked={checkedItems[diagnosis.code]} onChange={handleChange} name={diagnosis.code} />}
          label={diagnosis.code}
          key={diagnosis.code}
        />
      ))}
    </div>
  )
}

export default DiagnosisForm;