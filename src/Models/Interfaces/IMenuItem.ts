//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface IMenuItem
{
    id?                 : string
    restaurant_id       : string
    name                : string
    description         : string
    image               : string
    price               : number
    createdAt?          : Date | string
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IMenuItem
