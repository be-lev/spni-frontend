import { createStore } from "redux";
import { siteReducer } from "./SitesState";

const store = createStore(siteReducer);

export default store;