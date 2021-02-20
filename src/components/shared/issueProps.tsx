import { LabelProps } from "./labelProps";

export interface IssueProps {
    title: string,
    body: string,
    state: string,
    created_at: Date,
    labels: Array<LabelProps>
  }