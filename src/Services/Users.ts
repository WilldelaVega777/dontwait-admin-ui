//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import IUser                   from '../Models/Interfaces/IUser'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class UsersService
{
    public static async getUsers(): Promise<IUser[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/users`
            )
            return await (res.json()) as IUser[]
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async addUser(pNewUser: IUser)
    : Promise<IUser>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewUser,
                        createdAt: new Date()
                    })
                }
            )
            const addedUser = await response.json()
            return addedUser
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateUser(pUpdatedUser: IUser)
    : Promise<IUser>
    {
        try
        {
            const id = pUpdatedUser.id
            const response = await fetch(
                `${appSettings.dataApi}/users/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedUser)
                }
            )
            const updatedUser = await response.json()
            return updatedUser
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeUser(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/users/${id}`,
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
export default UsersService
