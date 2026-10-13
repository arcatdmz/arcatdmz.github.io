import { RedirectPage } from "@/site/components/RedirectPage";
export default function Page() {
  const url = "/user-generated-variables/";
  return (
    <RedirectPage url={url}>
      {
        "This URL is a shorthand for the full URL (https://junkato.jp/user-generated-variables)"
      }
    </RedirectPage>
  );
}
