//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface IUser
{
    id?                 : string
    firstName           : string
    lastName            : string
    address             : string
    phone               : string
    email               : string
    location_longitude  : number
    location_latitude   : number
    createdAt?          : Date | string
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IUser
