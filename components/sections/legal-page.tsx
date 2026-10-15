import { Container } from "@/components/ui/container";
import { Wireframe } from "@/components/ui/wireframe";
import { PageHeader } from "./page-header";

/** Shared shell for legal pages. Text must come from Arcaisys — never generated. */
export function LegalPage({ title, needs }: { title: string; needs: string[] }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <Container className="py-20 md:py-28">
        <Wireframe
          label={`${title} — text required`}
          note="Legal text must be supplied or approved by Arcaisys. It depends on:"
          className="max-w-2xl"
        >
          <ul className="list-inside list-disc space-y-1">
            {needs.map((need) => (
              <li key={need}>{need}</li>
            ))}
          </ul>
        </Wireframe>
      </Container>
    </>
  );
}
