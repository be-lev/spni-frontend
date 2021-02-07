import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import store from "../../../Redux/store";
import { siteDownloadedAction } from "../../../Redux/SitesState";
import LocationModel from "../Models/LocationModel";
import SiteModel from "../Models/SitesModel";
import SiteCard from "../SiteCard/SiteCard";

interface SitesListProps {}

interface SitesListState {
  sites: SiteModel[];
  locations: LocationModel[];
  selectedLocation: string;
  sitesByLocation: SiteModel[];
}

class SiteList extends Component<{}, SitesListState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      sites: store.getState().sites,
      locations: [],
      selectedLocation: "0",
      sitesByLocation: [],
    };
  }

  public async componentDidMount() {
    if (!store.getState().sites.length || !this.state.locations.length) {
      Promise.all([
        axios.get<SiteModel[]>("http://localhost:3003/api/sites"),
        axios.get<LocationModel[]>("http://localhost:3003/api/sites/locations"),
      ]).then(([sitesResponse, locationResponse]) => {
        const sitesAction = siteDownloadedAction(sitesResponse.data);
        store.dispatch(sitesAction);
        const locations = locationResponse.data;
        this.setState({ sites: store.getState().sites, locations });
      });
    }
  }

  public async componentDidUpdate(
    preProps: SitesListProps,
    prevState: SitesListState
  ) {
    if (this.state.selectedLocation !== prevState.selectedLocation) {
      try {
        const sitesByLocationResponse = await axios.get<SiteModel[]>(
          "http://localhost:3003/api/sites/sites-by-location/" +
            this.state.selectedLocation
        );
        const sitesByLocation = sitesByLocationResponse.data;
        this.setState({ sitesByLocation });
      } catch (err) {
        console.log(err);
        alert("Error");
      }
    }
  }

  private handelSelectedLocation = async (args: SyntheticEvent) => {
    const selectedLocation = (args.target as HTMLSelectElement).value;
    await this.setState({ selectedLocation });
  };

  public render(): JSX.Element {
    let sitesToShow = [];
    if (this.state.selectedLocation !== "0") {
      sitesToShow = this.state.sitesByLocation;
    } else {
      sitesToShow = this.state.sites;
    }
    return (
      <div className="SiteList">
        <h2>Hiking sites list</h2>
        <label>Select your Hiking from location: </label>
        <select
          name="locationName"
          defaultValue="0"
          onChange={this.handelSelectedLocation}
        >
          <option value="0">
              All locations
              </option>
          {this.state.locations.map((l) => (
            <option value={l.location} key={l.locationId}>
              {l.location}
            </option>
          ))}
        </select>
        <br/>

        {sitesToShow.map((s) => (
          <SiteCard key={s.siteId} singleSite={s} />
        ))}
      </div>
    );
  }
}

export default SiteList;
