//---------------------------------------------------------------------
// Eslint Mods Section
//---------------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */

//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useEffect }            from 'react'
import { useRef }               from 'react'
import { useFormik }            from 'formik';
import { useStateWithHistory }  from '../Hooks/useStateWithHistory'
import * as yup                 from 'yup';
import TextField                from '@mui/material/TextField'
import Grid                     from '@mui/material/Grid'
import { useAppDispatch }       from '../Hooks/useRedux'
import { useAppSelector }       from '../Hooks/useRedux'
import { getTransactions }      from '../Redux/Reducers/transaction.reducer'
import { addTransaction }       from '../Redux/Reducers/transaction.reducer'
import { updateTransaction }    from '../Redux/Reducers/transaction.reducer'
import { removeTransaction }    from '../Redux/Reducers/transaction.reducer'
import { setLoading }           from '../Redux/Reducers/system.reducer';
import { setError }             from '../Redux/Reducers/system.reducer';
import FormCard                 from '../Components/FormCard'
import Commands                 from '../Models/Enums/Commands'
import ITransaction             from '../Models/Interfaces/ITransaction'


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const Transactions = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    // Consts
    const PREVIOUS_STATE_STEPS: number = 3

    // States
    const [
        command,
        setCommand,
        {
            history,
            pointer
        }
    ] = useStateWithHistory(Commands.None)

    // Refs
    const positionRef = useRef(0)

    // Redux Dispatch Function
    const dispatch = useAppDispatch()

    // Redux Slice
    const {
        transactions,
        loading,
        error,
        message
    } = useAppSelector(
        state => state.transactions
    )

    // Form Validation Object (Yup)
    const validationSchema = yup.object({
        name: yup
          .string()
          .required('Name is required')
    })

    // Formik Form Definition
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (transactions.length > 0) ?
                transactions[positionRef.current].name :
                '',
            description: (transactions.length > 0) ?
                transactions[positionRef.current].description :
                ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let transaction
            const formerAction: Commands =
                history[pointer - PREVIOUS_STATE_STEPS]

            if (formerAction === Commands.Add)
            {
                transaction = { ...values }
                dispatch(addTransaction(transaction))
                positionRef.current = 0
            }
            else if (formerAction === Commands.Update)
            {
                transaction = {
                    id: transactions[positionRef.current].id,
                    ...values
                }
                dispatch(updateTransaction(transaction))
            }
            else
            {
                throw new Error('up')
            }
        }
    })

    //-----------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //-----------------------------------------------------------------
    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])
    //-----------------------------------------------------------------
    useEffect(() => {
        switch (command)
        {
            case Commands.First:
                positionRef.current = 0
                break;
            case Commands.Previous:
                positionRef.current =
                    (positionRef.current > 0 ? (positionRef.current -1): 0)
                break;
            case Commands.Next:
                positionRef.current =
                    (positionRef.current < (transactions.length-1) ?
                        (positionRef.current +1): positionRef.current)
                break;
            case Commands.Last:
                positionRef.current = (transactions.length -1)
                break;
            case Commands.Remove:
                dispatch(removeTransaction(
                    transactions[positionRef.current].id as string
                ))
                break;
            case Commands.Update:
                break;
            case Commands.Add:
                formik.setValues({
                    name: ('' as string),
                    description: ('' as string)
                } as ITransaction)
                break;
            case Commands.Save:
                formik.submitForm()
                break;
            case Commands.Cancel:
                formik.resetForm()
                break;
            default:
        }
        setCommand(Commands.None)
    }, [command, formik])
    //-----------------------------------------------------------------
    useEffect(() => {
        dispatch(setLoading(loading))
    }, [dispatch, loading])
    //-----------------------------------------------------------------
    useEffect(() => {
        dispatch(setError(error))
    }, [dispatch, error])
    //-----------------------------------------------------------------
    useEffect(() => {
        dispatch(setError(message))
    }, [dispatch, message])

    //-----------------------------------------------------------------
    // Internal Functions Section
    //-----------------------------------------------------------------
    const isDisabled = () => {
        return (
            (history[pointer-1] === Commands.Save) || 
            (history[pointer-1] === Commands.Cancel) ||
            (history[pointer-1] === undefined)
        )
    }

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <FormCard
            type='navigation'
            title='Transactions'
            command={command}
            setCommand={setCommand}
            canRew={positionRef.current !== 0}
            canFwd={positionRef.current < (transactions.length -1)}
        >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <TextField
                            fullWidth
                            disabled={isDisabled()}
                            id="name"
                            name="name"
                            label="Name"
                            variant="standard"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name
                                &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name
                                &&
                                formik.errors.name
                            }
                        />
                    </Grid>
                    <Grid item md={9}>
                        <TextField
                            fullWidth
                            disabled={isDisabled()}
                            id="description"
                            name="description"
                            label="Description"
                            type="description"
                            variant="standard"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description
                                &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description
                                &&
                                formik.errors.description
                            }
                        />
                    </Grid>
                </Grid>
            </form>
        </FormCard>
    )
}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default Transactions
