import { LabelProps } from "./labelprops";

export interface ResultProps {
    title: string,
    body: string,
    state: string,
    created_at: Date,
    labels: Array<LabelProps>
  }