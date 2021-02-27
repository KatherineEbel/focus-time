export enum Status {
  created,
  started,
  cancelled,
  completed
}
export type FocusSubject = {
  id: string | null,
  subject: string | null,
  status: Status | null,
}
