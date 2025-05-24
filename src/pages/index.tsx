import NotionPage from "@/components/NotionPage";
import { getRecordMapInProps } from "@/utils";
import { NextPageContext } from "next";

export default function Home(props: any) {
  return (
    <NotionPage
      recordMap={props.recordMap}
      pageId="1fd46bb6-5cee-8066-ab11-e114e1b0d330"
    />
  );
}

export const getServerSideProps = async (ctx: NextPageContext) =>
  await getRecordMapInProps(ctx, "1fd46bb6-5cee-8066-ab11-e114e1b0d330");
