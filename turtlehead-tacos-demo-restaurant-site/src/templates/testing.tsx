import { GetPath, TemplateProps } from "@yext/pages/*";
import * as React from "react"

export const getPath: GetPath<TemplateProps> = () => {
    return `locator`;
  };

const Test: any = () => {
return(
    <h1>helooo
    </h1>
)
}

export default Test
