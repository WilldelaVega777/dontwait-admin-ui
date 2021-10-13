//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import ICategory                from './ICategory'
import IReview                  from './IReview'
import ITransaction             from './ITransaction'


//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface IRestaurant
{
    id?                 : string
    name                : string
    image               : string
    categories          : ICategory[]
    reviews             : IReview[]
    transactions        : ITransaction[]
    createdAt?          : Date | string
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IRestaurant
