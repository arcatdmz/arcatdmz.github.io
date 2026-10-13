import { RedirectPage } from "@/site/components/RedirectPage";
export default function Page() {
  const url = "/ja/user-interface-design";
  return (
    <RedirectPage url={url}>
      {
        "This content is currently only available in Japanese at /ja/user-interface-design."
      }
    </RedirectPage>
  );
}
