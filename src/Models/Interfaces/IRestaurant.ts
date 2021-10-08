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
    image_url           : string
    categories          : ICategory[]
    reviews             : IReview[]
    transactions        : ITransaction[]
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IRestaurant
