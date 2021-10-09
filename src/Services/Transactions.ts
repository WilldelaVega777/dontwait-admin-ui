//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import ITransaction            from '../Models/Interfaces/ITransaction'
import appSettings             from '../Config/appSettings'

//---------------------------------------------------------------------
// Service Section
//---------------------------------------------------------------------
class TransactionsService
{
    public static async getTransactions(): Promise<ITransaction[]>
    {
        try
        {
            const res = await fetch(
                `${appSettings.dataApi}/transactions`
            )
            return await (res.json()) as ITransaction[]
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
export default TransactionsService
