//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import IUser                    from './IUser'
import IRestaurant              from './ITransaction'
import IMenuItem                from './IMenuItem'


//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface IOrder
{
    id?                 : string
    user                : IUser
    restaurant          : IRestaurant
    items               : IMenuItem[]
    createdAt           : Date
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IOrder
