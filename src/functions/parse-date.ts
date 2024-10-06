export default function parseDate(date: string | Date): string {
  return new Date(date).toDateString();
}
