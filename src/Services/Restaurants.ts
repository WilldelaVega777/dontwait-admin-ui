//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import IRestaurant             from '../Models/Interfaces/IRestaurant'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class RestaurantsService
{
    public static async getRestaurants(): Promise<IRestaurant[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/restaurants`
            )
            return await (res.json()) as IRestaurant[]
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async addRestaurant(pNewRestaurant: IRestaurant)
    : Promise<IRestaurant>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/restaurants`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewRestaurant,
                        createdAt: new Date()
                    })
                }
            )
            const addedRestaurant = await response.json()
            return addedRestaurant
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateRestaurant(pUpdatedRestaurant: IRestaurant)
    : Promise<IRestaurant>
    {
        try
        {
            const id = pUpdatedRestaurant.id
            const response = await fetch(
                `${appSettings.dataApi}/restaurants/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedRestaurant)
                }
            )
            const updatedRestaurant = await response.json()
            return updatedRestaurant
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeRestaurant(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/restaurants/${id}`,
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
export default RestaurantsService
