// src/components/StoreLocator.tsx

import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  getUserLocation,                            
  OnDragHandler
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";            
import { useEffect, useState } from "react";  
import { BiLoaderAlt } from "react-icons/bi";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";  
import MapPin from "./MapPin"; 

type InitialSearchState = "not started" | "started" | "complete";

const StoreLocator = (): JSX.Element => {
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
    <>
    
      <div className="relative flex h-[calc(100vh-242px)] border">
      {initialSearchState !== "complete" && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center bg-white opacity-70">
            <BiLoaderAlt className="animate-spin " size={64} />
          </div>
        )}
        <div className="flex w-1/3 flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "builtin.location",
              },
            ]}
          />
                   {resultCount > 0 && <VerticalResults CardComponent={LocationCard} />}
          {resultCount === 0 && initialSearchState === "complete" && (
            <div className="flex items-center justify-center">
              <p className="pt-4 text-2xl">No results found for this area</p>
            </div>
          )}
        </div>
        <div className="relative w-2/3">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
            PinComponent={MapPin}
            onDrag={handleDrag}
          />
          {showSearchAreaButton && (
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <button
                onClick={handleSearchAreaClick}
                className="rounded-2xl border bg-white py-2 px-4 shadow-xl"
              >
                <p>Search This Area</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreLocator;
