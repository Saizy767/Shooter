
export type SidepanelCatalogType = {
        name: string,
        id: number,
        items?: SidepanelCatalogType[],
}
type Sidepanel = {
    alcohol: SidepanelCatalogType[]
    non_alcohol: SidepanelCatalogType[]
}


export const stateSidepael:Sidepanel = {
    alcohol:[{name: 'Vino',
    id:1,
    items:[{name:'White', id:10},{name:"Red",id:11}]
    }],
    non_alcohol:[
    {name: 'Sirop', id: 2, items:[{name:'Ananas', id:20},{name:'Strawberry', id:21}]}], 
}