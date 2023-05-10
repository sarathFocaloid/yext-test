import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AnalyticsProvider,  AnalyticsScopeProvider                                              // New
} from "@yext/pages/components";   
import { TemplateProps } from "@yext/pages";   

type Props = {
  children?: React.ReactNode;
  templateData: TemplateProps; 
};

const PageLayout = ({ children, templateData}: Props) => {
  return (
    <AnalyticsProvider templateData={templateData} enableDebugging={true}  requireOptIn={true}>

    <div className="min-h-screen">
    <AnalyticsScopeProvider name={"header"}> 
      <Header />
      </AnalyticsScopeProvider>
      {children}
      <Footer></Footer>
    </div>
    </AnalyticsProvider>                                        

  );
};

export default PageLayout;
