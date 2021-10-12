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
    //-----------------------------------------------------------------
    public static async addTransaction(pNewTransaction: ITransaction)
    : Promise<ITransaction>
    {
        try
        {
            const response = await fetch(
                `${appSettings.dataApi}/transactions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...pNewTransaction,
                        createdAt: new Date()
                    })
                }
            )
            const addedTransaction = await response.json()
            return addedTransaction
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async updateTransaction(pUpdatedTransaction: ITransaction)
    : Promise<ITransaction>
    {
        try
        {
            const id = pUpdatedTransaction.id
            const response = await fetch(
                `${appSettings.dataApi}/transactions/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(pUpdatedTransaction)
                }
            )
            const updatedTransaction = await response.json()
            return updatedTransaction
        }
        catch(e: any)
        {
            console.error(e.message)
            return Promise.reject(e?.message || e)
        }
    }
    //-----------------------------------------------------------------
    public static async removeTransaction(id: string): Promise<string>
    {
        try
        {
            await fetch(
                `${appSettings.dataApi}/transactions/${id}`,
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
export default TransactionsService
