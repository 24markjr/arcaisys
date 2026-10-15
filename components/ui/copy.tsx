import type { CopyField } from "@/content/types";
import { Pending } from "./pending";

/**
 * Renders a CopyField: approved text as normal copy, drafts and missing text
 * through the striped Pending marker so they can never pass as final.
 */
export function Copy({ field }: { field: CopyField }) {
  if (field.text && field.approved) return <>{field.text}</>;
  return <Pending need={field.need}>{field.text ?? undefined}</Pending>;
}

/** Whether a field has final, approved text. */
export function isFinal(field: CopyField) {
  return Boolean(field.text && field.approved);
}
