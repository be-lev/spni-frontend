import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { siteAddedAction } from "../../../Redux/SitesState";
import store from "../../../Redux/store";
import LocationModel from "../Models/LocationModel";
import "./AddSite.css";
import SiteModel from "../Models/SitesModel";

function AddSites(): JSX.Element {
  const history = useHistory();

  //TODO: change to new react format
//   const categoriesStateArray = useState<CategoryModel[]>([]);
//   const categories = categoriesStateArray[0];
//   const setCategories = categoriesStateArray[1];

  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get<LocationModel[]>(
        "http://localhost:3003/api/sites/locations"
      );
      const locations = response.data;
      setLocations(locations);
    })();
  }, []);

  const { register, handleSubmit } = useForm<SiteModel>();

  async function send(site: SiteModel) {
    try {
      const response = await axios.post<SiteModel>(
        "http://localhost:3003/api/sites",
        site
      );
      const addedSite = response.data;
      const action = siteAddedAction(addedSite);
      store.dispatch(action);
      alert(
        "Site ID: " + addedSite.siteId + "has been successfully added"
      );

      history.push("/")
    } catch (err) {
      console.log(err);
      alert("Error site not added");
    }
  }

  return (
    <div className="AddSites">
      <h2>Add a hiking site</h2>
      <form onSubmit={handleSubmit(send)}>
        <label>Location: </label> <br />
        <select name="locationId" defaultValue="0" ref={register}>
          <option disabled value="0">
            Select location
          </option>
          {locations.map((l) => (
            <option key={l.locationId} value={l.locationId}>
              {l.location}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Name:</label> <br />
        <input type="text" name="name" ref={register} />
        <br />
        <br />
        <label>Description :</label> <br />
        <input type="text" name="description" ref={register} />
        <br />
        <br />
        <label>Adult entry price:</label> <br />
        <input type="number" step="0.1" name="adultEntryPrice" ref={register} />
        <br />
        <br />
        <label>Kids entry price:</label> <br />
        <input type="number" step="0.1" name="kidsEntryPrice" ref={register} />
        <br />
        <br />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddSites;