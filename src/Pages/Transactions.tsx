//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useState }             from 'react'
import { useEffect }            from 'react'
import { useFormik }            from 'formik';
import usePrevious              from '../Hooks/usePrevious'
import * as yup                 from 'yup';
import TextField                from '@mui/material/TextField'
import Grid                     from '@mui/material/Grid'
import { useAppDispatch }       from '../Hooks/useRedux'
import { useAppSelector }       from '../Hooks/useRedux'
import { getTransactions }      from '../Redux/Reducers/transaction.reducer'
import { setLoading }           from '../Redux/Reducers/system.reducer';
import { setError }             from '../Redux/Reducers/system.reducer';
import FormCard                 from '../Components/FormCard'
import Commands                 from '../Models/Enums/Commands'
//import ITransaction             from '../Models/Interfaces/ITransaction'


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const Transactions = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    // States
    const [command, setCommand] = useState(Commands.None)
    const previousCommand = usePrevious(command)

    // Redux Dispatch Function
    const dispatch = useAppDispatch()

    // Redux Slice
    const {
        transactions,
        loading,
        error
    } = useAppSelector(state => state.transactions)

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
            name: (transactions.length > 0) ? transactions[0].name : '',
            description: (transactions.length > 0) ? transactions[0].description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
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
            case Commands.Save:
                formik.submitForm()
                break;
            case Commands.Cancel:
                formik.resetForm()
                break;
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
    // Internal Functions Section
    //-----------------------------------------------------------------
    const isDisabled = () => {
        return (
            (previousCommand === Commands.Save) || 
            (previousCommand === Commands.Cancel)
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
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
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
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
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
