import { CodePlayground } from '@/site/talks/CodePlayground';
import { TalkPage } from '@/site/talks/TalkPage';
import { type PageDataProps } from '@/site/page-data';
import { getPageData } from '@/site/page-data.server';
function Content() { return <><h2 className="ui header">My First IDE</h2><CodePlayground storageKey="as-a-code-ide" /></>; }
export default function Page(props: PageDataProps) { return <TalkPage {...props} slug="as-a-code" chapter={3} Content={Content} ide />; }
export function getStaticProps() { return { props: {pageData: getPageData('/ja/talks/as-a-code/ide/')} }; }
