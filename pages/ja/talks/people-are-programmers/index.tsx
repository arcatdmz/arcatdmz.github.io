import { RedirectPage } from "@/site/components/RedirectPage";
export default function Page() {
  const url = "http://junkato.digitalmuseum.jp/ja/talks/people-are-programmers";
  return (
    <RedirectPage url={url}>
      {
        "This web application does not run on HTTPS and is currently hosted at http://junkato.digitalmuseum.jp/ja/talks/people-are-programmers."
      }
    </RedirectPage>
  );
}
