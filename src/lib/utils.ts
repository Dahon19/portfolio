export function cn(...inputs: any[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .map((item) => {
      if (typeof item === "string") return item;
      if (typeof item === "object" && item !== null) {
        return Object.entries(item)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .join(" ");
}
