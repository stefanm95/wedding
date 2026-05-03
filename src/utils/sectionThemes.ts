export function getSectionColor(section: string) {
  switch (section) {
    case "hero":
      return "#6b1f2b";

    case "paper-hero":
    case "story":
      return "#6b1f2b";

    case "program":
      return "#b48c5a";

    case "rsvp":
      return "#8c6a3c";

    default:
      return "#6b1f2b";
  }
}
