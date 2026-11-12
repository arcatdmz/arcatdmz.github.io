import { type ReactNode } from "react";
import { Container } from "react-fomantic-ui";

import { ProjectHeader } from "@/site/components/projects/ProjectHeader";
import { useSiteContext } from "@/site/hooks/useSiteContext";

export function ProjectHero({
  project,
  additionalLabels,
  heroImage,
}: {
  project: string;
  additionalLabels?: ReactNode | ReactNode[];
  heroImage?: string;
}) {
  const { projectsTable, rootPath } = useSiteContext();

  const p = projectsTable[project];
  const backgroundImageUrl = heroImage || `${rootPath}images/heros/${p.hero}`;
  return (
    <>
      <div className="hero-unit">
        <div className="background-wrapper">
          <div
            className="background"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
        </div>
        <Container>
          <ProjectHeader
            project={project}
            additionalLabels={additionalLabels}
          />
        </Container>
      </div>
    </>
  );
}
