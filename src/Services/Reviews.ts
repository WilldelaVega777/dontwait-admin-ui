//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import IReview                 from '../Models/Interfaces/IReview'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class ReviewsService
{
    public static async getReviews(): Promise<IReview[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/reviews`
            )
            return await (res.json()) as IReview[]
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async addReview(pNewReview: IReview)
    : Promise<IReview>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/reviews`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewReview,
                        createdAt: new Date()
                    })
                }
            )
            const addedReview = await response.json()
            return addedReview
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateReview(pUpdatedReview: IReview)
    : Promise<IReview>
    {
        try
        {
            const id = pUpdatedReview.id
            const response = await fetch(
                `${appSettings.dataApi}/reviews/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedReview)
                }
            )
            const updatedReview = await response.json()
            return updatedReview
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeReview(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/reviews/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
            return 'resource deleted...'
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default ReviewsService
