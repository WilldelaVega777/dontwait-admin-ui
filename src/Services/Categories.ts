//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import ICategory               from '../Models/Interfaces/ICategory'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class CategoriesService
{
    public static async getCategories(): Promise<ICategory[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/categories`
            )
            return await (res.json()) as ICategory[]
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async addCategory(pNewCategory: ICategory)
    : Promise<ICategory>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/categories`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewCategory,
                        createdAt: new Date()
                    })
                }
            )
            const addedCategory = await response.json()
            return addedCategory
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateCategory(pUpdatedCategory: ICategory)
    : Promise<ICategory>
    {
        try
        {
            const id = pUpdatedCategory.id
            const response = await fetch(
                `${appSettings.dataApi}/categories/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedCategory)
                }
            )
            const updatedCategory = await response.json()
            return updatedCategory
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeCategory(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/categories/${id}`,
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
export default CategoriesService
