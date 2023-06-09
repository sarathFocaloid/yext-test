import * as React from "react";
import { Address } from "@yext/pages/components";

const Details = (props: any) => {
  const { address, phone, cateringPhoneNumber } = props;

  return (
    <>
      <div className="grid">
        <div className="text-xl font-semibold">Store Details</div>
        <div className="grid grid-cols-2 py-4">
          <div>
            <Address address={address} />
            <div className="pt-4">
              <a href="#">{phone}</a>
            </div>
            {cateringPhoneNumber && <h1>cateringPhoneNumber {cateringPhoneNumber} </h1> }
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
