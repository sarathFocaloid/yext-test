// src/components/StoreLocator.tsx

import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  getUserLocation,
  OnDragHandler,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";
import MapPin from "./MapPin";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./DropDown";

type InitialSearchState = "not started" | "started" | "complete";

const VodaFoneStoreLocator = (): JSX.Element => {
  const resultCount = useSearchState(
    (state) => state.vertical.resultsCount || 0
  );
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [mapCenter, setMapCenter] = useState<LngLat | undefined>();
  const [mapBounds, setMapBounds] = useState<LngLatBounds | undefined>();
  const searchActions = useSearchActions();

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };
  const [initialSearchState, setInitialSearchState] =
    useState<InitialSearchState>("not started");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);
  const handleDrag: OnDragHandler = (center: LngLat, bounds: LngLatBounds) => {
    setMapCenter(center);
    setMapBounds(bounds);
    setShowSearchAreaButton(true);
  };

  const handleSearchAreaClick = () => {
    if (mapCenter && mapBounds) {
      const locationFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Current map area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          value: {
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: mapBounds.getNorthEast().distanceTo(mapCenter),
          },
          matcher: Matcher.Near,
        },
      };
      searchActions.setStaticFilters([locationFilter]);
      searchActions.executeVerticalQuery();
      setShowSearchAreaButton(false);
    }
  };

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Current Location",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .catch(() => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "New York City, New York, NY",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: 40.7128,
                lng: -74.006,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .then(() => {
        searchActions.executeVerticalQuery();
        setInitialSearchState("started");
      });
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);

  return (
    <div className="locator-container relative h-screen w-screen border">
      {/* <div className="header">
          <Header />
        </div> */}
      <div className="locator-search-wrapper  ">
        <div className="locator-search-bar">
          <input className="input-box" placeholder="PLZ oder Ort" />
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="2xl"
              className="magGlass"
            />
          </button>
          <button>
            <FontAwesomeIcon icon={faCrosshairs} size="2xl" />
          </button>
          <div className="filter flex gap-2">
            <div className="bg-gray-400 flex-auto flex justify-center">
                {/* <button> */}
                    <Dropdown/>
                {/* </button> */}
                </div>
            <div className="bg-gray-800 flex-auto flex justify-center">
                {/* <button> */}

                <Dropdown/>
                
                {/* </button> */}
                </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="locator-map w-screen h-screen">
        <MapboxMap
          mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
          PinComponent={MapPin}
          onDrag={handleDrag}
        />
      </div>
    </div>
  );
};

export default VodaFoneStoreLocator;
