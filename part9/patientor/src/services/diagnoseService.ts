import { DiagnosisEntry } from "../types";
import diagnoseData from '../../data/diagnoses'

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoseData;
}

export default {
  getDiagnoses
}
