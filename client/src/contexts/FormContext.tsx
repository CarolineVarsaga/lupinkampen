import { createContext } from "react";
import { IForm } from "../models/formModels";

export const FormContext = createContext<IForm | undefined>(undefined);
