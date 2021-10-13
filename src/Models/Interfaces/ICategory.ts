//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface ICategory
{
    id?                 : string
    name                : string
    image               : string
    keywords?           : string[]
    createdAt?          : Date | string
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default ICategory
