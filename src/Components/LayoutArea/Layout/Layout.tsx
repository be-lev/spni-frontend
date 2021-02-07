import {
    BrowserRouter,
    NavLink,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";
import AddSite from "../../SitesArea/AddSite/AddSite";
import DeleteSite from "../../SitesArea/DeleteSite/DeleteSite";
import SiteList from "../../SitesArea/SiteList/SiteList";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout">
        <h1>Welcome to the Society for the Protection of Nature in Israel Website</h1>
        <h3>Here you will find all hot and up to date hiking sites in israel </h3>
        <nav>
          <NavLink to="/sites">Sites list </NavLink>
          <span> | </span>
          <NavLink to="/add-site">Add site</NavLink>
        </nav>
        <hr />
	

        <Switch>
          <Route path="/sites" component={SiteList} exact />
          <Route path="/add-site" component={AddSite} exact />
          <Route path="/sites/details/:siteId" component={DeleteSite} exact />
          <Redirect from="/" to="/sites" exact />
        </Switch>
        </div>
        </BrowserRouter>
    );
}

export default Layout;
