import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  GetRedirects,
} from "@yext/pages";
import "../index.css";

import { Image } from "@yext/pages/components";
import Hours from "../components/Hours";

import {
  faArrowsUpToLine,
  faHeart,
  faStar,
  faStarHalf,
  faChevronRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const config: TemplateConfig = {
  stream: {
    $id: "vodafoneLocation",
    fields: [
      "id",
      "name",
      "address",
      "hours",
      "slug",
      "photoGallery",
      "c_vodafoneLogo",
      "c_navbarList",
      "c_breadCrumb",
      "c_officePhoto",
      "mainPhone",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_vodafoneShop"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en", "es"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`take-me-to-getPath`, `go-fast-{document.name}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const { name, description } = document;
  return {
    title: name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description,
        },
      },
    ],
  };
};

const vodafoneLocation: Template<TemplateRenderProps> = ({ document }) => {
  const {
    name,
    address,
    hours,
    photoGallery,
    c_breadCrumb,
    c_vodafoneLogo,
    c_navbarList,
    c_officePhoto,
    mainPhone,
    mobilePhone,
  } = document;
  console.log("hours", document.hours);

  // const geocodedCoordinate = {
  //   latitude: 10.0099506,
  //   longitude:76.3752933
  // }

  return (
    <div className="grid-container">
      <div className="nav-bar" >
        <div className="w-12"  >
          <Image image={c_vodafoneLogo} />
        </div>
      {c_navbarList[0] &&
          c_navbarList.map((each: string) => {
            return <p className="text-xl m-3">{each}</p>;
          })}
      </div>

      <div className="shop-address">
      <p className="address-text">

        {/* <p className="text-4xl leading-normal font-sans font-light"> */}
          {name}
          <br />
          {address.line1}
          <br />
          <p className="flex flex-wrap">
          <span className="mr-2">{address.postalCode}</span>
          <span className="mr-2">{address.city}</span>
          </p>
        </p>
      </div>

      <div className="contact">
      <div className="flex flex-wrap">
          <span className="text-lg mr-9 ">phone</span>
          <span className="font-medium text-xl mr-8">06205 2322170</span>
          </div>
          <div className="flex flex-wrap">
          <span className="text-lg mr-8">Mobile</span>
          <span className="font-medium text-xl mr-8">01522 1544496</span>
          </div>
        {/* <span className="text-lg mr-8">phone</span>
        <span className="font-medium text-xl">06205 2322170</span> */}
        {/* <br></br>
        <span className=" text-lg mr-8">Mobile</span>
        <span className="font-medium text-xl">01522 1544496</span> */}
      </div>

      <div className="grid buttons pr-24">
        <button className="mb-2 text-xl bg-stone-700 hover:bg-stone-900 rounded-md mt-2 text-white h-24">
          Make an
          <br /> appointment
        </button>

        <button className=" text-xl bg-stone-700 hover:bg-stone-900 rounded-md mt-2 text-white h-16 ">
          Directions
        </button>
      </div>

      <div className=" shop-time">
        <Hours title={"Open now Closes at 6:00"} hours={hours} />
      </div>

      <div className="rate">
        <div className="flex flex-row mt-8 align-middle">
          <span className="font-bold text-4xl">4.3</span>
            <FontAwesomeIcon icon={faStar} className="star pt-3 ml-1 mr-1" />
            <FontAwesomeIcon icon={faStar} className="star pt-3 mr-1" />
            <FontAwesomeIcon icon={faStar} className="star pt-3 mr-1" />
            <FontAwesomeIcon icon={faStar} className="star pt-3 mr-1" />
            <FontAwesomeIcon icon={faStarHalf} className="star pt-3 mr-1" />
        </div>
        <p className="text-gray-500 text-sm">145 Google reviews</p>
        <div className="flex">
          <p className="text-red-500 text-2xl mt-1">Rate us now</p>
          <FontAwesomeIcon icon={faChevronRight} className="arrow mt-1" />
        </div>
      </div>

      <div className="bg-slate-900 shop-image">
        <Image image={c_officePhoto}/>
        {/* <div className="bg-black h-16"></div> */}
        {/* <StaticMap latitude={"10.0099506"} longitude={"76.3752933"} /> */}
        {/* </StaticMap> */}
      </div>
      
    </div>
  );
};

export default vodafoneLocation;
