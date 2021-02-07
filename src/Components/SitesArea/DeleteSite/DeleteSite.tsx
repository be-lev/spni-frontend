import React, { Component } from "react";
import {NavLink, RouteComponentProps } from "react-router-dom";
import { History } from "history";
import store from "../../../Redux/store";
import axios from "axios";
import SiteModel from "../Models/SitesModel";
import { siteDeletedAction } from "../../../Redux/SitesState";


interface MatchParams{
    siteId: string;
}

interface DetailsProps extends RouteComponentProps<MatchParams>{
    history: History;
}

interface DetailsState {
    site: SiteModel;
}

class Details extends Component<DetailsProps, DetailsState> {

    public constructor(props: DetailsProps){
        super(props)
        const id= +this.props.match.params.siteId;
        const site = store.getState().sites.find(s=> s.siteId === id)
        this.state={ site }   
    }

    public deleteSite = async () => {
        const answer = window.confirm("are you sure?");
        if(!answer) return;
        const response= await axios.delete<SiteModel>("http://localhost:3003/api/sites/"+ this.state.site.siteId);
       const sitesAction =siteDeletedAction(response.data)
        store.dispatch( sitesAction );
        this.props.history.push("/sites"); // SPA Redirect
    }

    public render(): JSX.Element {
        return (
            <div className="Details">
          
				    {this.state.site &&
                    <>
                        <h2>Product Details:</h2>
                        <h3>Hiking site name: {this.state.site.name}</h3>
                        <h3>Location: {this.state.site.location}</h3>
                        <h3>Description: {this.state.site.description}</h3>
                        <h3>Adult entry price: {this.state.site.adultEntryPrice}$</h3>
                        <h3>Kids entry price: {this.state.site.kidsEntryPrice}$</h3>
                        <br /> <br />
                        <NavLink to="/sites">Back to List</NavLink>
                        <span> | </span>
                        <button onClick={this.deleteSite} style={{border:"none",margin:"0",padding:"0",width:"auto",overflow:"visible",background:"transparent",font:"inherit",lineHeight: "normal",color: "lightblue", cursor:"pointer", textDecoration:"underline"}}>
                            Delete this site</button>
                    </>
                }
            </div>
        );
    }
}

export default Details;
