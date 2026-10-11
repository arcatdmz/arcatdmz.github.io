import projects from "../src/javascripts/projects";

describe("project year ranges", () => {
  const ongoing = projects.find((project) => project.year && !project.year.to)!;
  const completed = projects.find(
    (project) => typeof project.year?.to === "number",
  )!;

  it("uses an explicit build year instead of the browser's current year", () => {
    expect(ongoing.getYearString("en", 2026)).toBe(`${ongoing.year.from}-2026`);
    expect(ongoing.getYearString("ja", 2026)).toBe(`${ongoing.year.from}-2026`);
  });

  it("does not overwrite a completed project's end year", () => {
    const expected =
      completed.year.from === completed.year.to
        ? `${completed.year.from}`
        : `${completed.year.from}-${completed.year.to}`;
    expect(completed.getYearString("en", 2099)).toBe(expected);
  });

  it("keeps a single year when an ongoing project began in the build year", () => {
    expect(ongoing.getYearString("ja", ongoing.year.from)).toBe(
      `${ongoing.year.from}`,
    );
  });
});

describe("project member formatting", () => {
  it("keeps shared member data unchanged across repeated page renders", () => {
    const project = projects.find((entry) =>
      entry.getMembers("en").includes("Jun Kato"),
    )!;
    const members = [...project.getMembers("en")];
    expect(project.getMembersTags("en")).toContain("<u>Jun Kato</u>");
    expect(project.getMembers("en")).toEqual(members);
    expect(project.getMembersTags("en")).toContain("<u>Jun Kato</u>");
  });
});
