// locator.tsx

import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import StoreLocator from "../components/StoreLocator";
import VodaFoneStoreLocator from "../components/vodafoneStoreLocator";
import Header from "../components/Header";

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Turtlehead Tacos Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY,
  // make sure your experience key matches what you see in the platform
  experienceKey: "turtlehead-tacos-locator",
  locale: "en",
  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = ({ document, __meta }) => {
  console.log("locator document", document);
  return (
    <PageLayout templateData={{ __meta, document }}>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="container">
          <Header/>
          <VodaFoneStoreLocator />
          {/* <div className="header">
  <div className="logo"></div>
</div> */}

          {/* <div className="map h-4/5 bg-slate-500">
seufhweifh

</div> */}

          {/* <div className="footer">
  
</div> */}

          {/* <div className="search-bar">

</div> */}

          {/* <div className="filter">

</div> */}
        </div>
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default Locator;

{
  /* <PageLayout templateData={{__meta, document}}>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="mx-auto max-w-7xl px-4">
        <StoreLocator />

        </div>
       </SearchHeadlessProvider>
     </PageLayout>  */
}
