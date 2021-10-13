//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import IMenuItem               from '../Models/Interfaces/IMenuItem'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class MenuItemsService
{
    public static async getMenuItems(): Promise<IMenuItem[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/menuitems`
            )
            return await (res.json()) as IMenuItem[]
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async addMenuItem(pNewMenuItem: IMenuItem)
    : Promise<IMenuItem>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/menuitems`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewMenuItem,
                        createdAt: new Date()
                    })
                }
            )
            const addedMenuItem = await response.json()
            return addedMenuItem
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateMenuItem(pUpdatedMenuItem: IMenuItem)
    : Promise<IMenuItem>
    {
        try
        {
            const id = pUpdatedMenuItem.id
            const response = await fetch(
                `${appSettings.dataApi}/menuitems/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedMenuItem)
                }
            )
            const updatedMenuItem = await response.json()
            return updatedMenuItem
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeMenuItem(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/menuitems/${id}`,
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
export default MenuItemsService
