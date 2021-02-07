import { NavLink } from "react-router-dom";
import "./SiteCard.css";
import SitesModel from "../Models/SitesModel"

interface SiteCardProps {
    singleSite: SitesModel;
}


function SiteCard({singleSite}:SiteCardProps): JSX.Element {
    return (
        <div className="SiteCard">
			Location: {singleSite.location} <br/>
            Name: {singleSite.name} <br/>
            Description: {singleSite.description} <br/>
            Adult entry price: {singleSite.adultEntryPrice} $<br/>
            Kids entry price: {singleSite.kidsEntryPrice}$ <br/>
            <NavLink to={"/sites/details/" + singleSite.siteId}> delete site </NavLink>
        </div>
    );
}

export default SiteCard;
