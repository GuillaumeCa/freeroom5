export function cls(...classes: (string | Boolean)[]): string {
  return classes
    .filter(Boolean)
    .map(String)
    .map((cl) => cl.trim())
    .join(" ");
}
