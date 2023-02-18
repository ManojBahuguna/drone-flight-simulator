/** each row should be separated by newline and have format: "timestamp lat lng" */
export function textToPath(text: string) {
  return text.split("\n").map((row) => {
    const [timestamp, lat, lng] = row.split(" ").map((v) => +v);
    return { id: Math.random(), timestamp, lat, lng };
  });
}
