import {
  getLocalizedPageRecordMap,
  isPageDataLocalized,
  localizePageRecordMap,
} from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { FadeLoader } from "react-spinners";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface INotionPageProps {
  pageId: string;
  recordMap?: any;
  rendererProps?: Omit<
    React.ComponentProps<typeof NotionRenderer>,
    "recordMap"
  >;
}

const NotionPage = (props: INotionPageProps) => {
  const { pageId } = props;
  const [recordMap, setRecordMap] = useState<any>(props.recordMap);

  useEffect(() => {
    if (!!recordMap) {
      if (props.recordMap) {
        localizePageRecordMap(pageId, recordMap);
      }
      document.title = `${recordMap.block[pageId].value.properties.title[0]}`;
      return;
    }
    setRecordMap(getLocalizedPageRecordMap(pageId));
  }, [pageId, recordMap]);

  if (!recordMap) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <FadeLoader color={"rgb(154, 162, 160)"} />
      </div>
    );
  }

  const styles = (
    <style
      dangerouslySetInnerHTML={{
        __html: /* css */ `
    .notion-app {
      height: 100vh;
      overflow: hidden;
    }
    .notion-frame {
      height: 100vh;
      overflow: hidden;
    }
    .notion-page-scroller {
      overflow: auto;
    }
    
  `,
      }}
    />
  );

  return (
    <Fragment>
      {/* {styles} */}
      <NotionRenderer
        recordMap={recordMap}
        fullPage
        mapPageUrl={(pageId) => {
          const urlSuffix = isPageDataLocalized(pageId) ? "?local=true" : "";
          let url = ``;
          switch (pageId) {
            case "1fd46bb6-5cee-8066-ab11-e114e1b0d330":
              url = "../";
              break;
            default:
              url = `../notion-page/${pageId}`;
              break;
          }
          return (url = `${url}${urlSuffix}`);
        }}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        {...(props.rendererProps ?? {})}
      />
    </Fragment>
  );
};

export default NotionPage;
