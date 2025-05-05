export type IAlert = {
  type: 'success' | 'error' | 'warning' | 'info' | undefined;
  text: string;
  title: string;
  icon?: string;
}