import { RedirectPage } from "@/site/components/RedirectPage";
export default function Page() {
  const url = "/user-generated-variables/";
  return <RedirectPage url={url}>{"日本語のページはありません"}</RedirectPage>;
}
