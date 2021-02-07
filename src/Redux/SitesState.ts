import SiteModel from "../Components/SitesArea/Models/SitesModel";


export class SitesState{
    public sites: SiteModel[] = []
}

export enum SitesActionType{
    SitesDownloaded,
    SiteAdded,
    SiteDeleted = "SiteDeleted"
}

export interface SitesAction {
    type: SitesActionType;
    payload?: any;
}

export function siteDownloadedAction(sites: SiteModel[]): SitesAction{
    return { type:SitesActionType.SitesDownloaded, payload: sites}
}

export function siteAddedAction(sites: SiteModel): SitesAction{
    return { type:SitesActionType.SiteAdded, payload: sites}
}

export function siteDeletedAction(sites: SiteModel): SitesAction{
    return { type:SitesActionType.SiteDeleted, payload: sites}
}

export function siteReducer(currentState: SitesState = new SitesState(), action: SitesAction): SitesState {
    const newState = { ...currentState };

    switch(action.type) {

        case SitesActionType.SitesDownloaded:
            newState.sites= action.payload;
            break;
        case SitesActionType.SiteAdded:
            newState.sites= action.payload;
            break;
        case SitesActionType.SiteDeleted:
            const indexToDelete = newState.sites.findIndex(s=>s.siteId === action.payload);
            newState.sites.splice(indexToDelete,1);
            break;        
    }
    return newState
}