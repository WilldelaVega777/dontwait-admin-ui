//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface ITransaction
{
    id?                 : string
    name                : string
    description         : string
    createdAt?          : Date | string
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default ITransaction
