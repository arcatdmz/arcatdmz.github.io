import { RedirectPage } from "@/site/components/RedirectPage";
export default function Page() {
  const url = "/ja/science";
  return (
    <RedirectPage url={url}>
      {"This content is currently only available in Japanese at /ja/science."}
    </RedirectPage>
  );
}
