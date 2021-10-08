//---------------------------------------------------------------------
// Interface Section
//---------------------------------------------------------------------
interface IReview
{
    id?                 : string
    restaurant_id       : string
    user_id             : string
    name                : string
    description         : string
    rating              : Number
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default IReview
