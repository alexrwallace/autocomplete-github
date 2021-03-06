import { LabelProps } from "../shared/labelProps";

export interface ResultProps {
    title: string,
    body: string,
    state: string,
    created_at: Date,
    labels: Array<LabelProps>
  }