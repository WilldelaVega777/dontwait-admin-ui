//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useState }             from 'react'
import { useEffect }            from 'react'
import { useFormik }            from 'formik';
import * as yup                 from 'yup';
import TextField                from '@mui/material/TextField'
import Grid                     from '@mui/material/Grid'
import { useAppDispatch }       from '../Hooks/useRedux'
import { useAppSelector }       from '../Hooks/useRedux'
import { getTransactions }      from '../Redux/Reducers/transaction.reducer'
import FormCard                 from '../Components/FormCard'
import ITransaction             from '../Models/Interfaces/ITransaction'


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const Transactions = () => {
    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [submit, setSubmit] = useState(false)
    const [clear, setClear]   = useState(false)

    const dispatch = useAppDispatch()
    const {
        transactions,
        loading
    } = useAppSelector(
        (state) => state.transactions
    )

    const validationSchema = yup.object({
        name: yup
          .string()
          .required('Name is required')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('submit')
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
        if (submit)
        {
            formik.submitForm()
            setSubmit(false)
        }
    }, [submit, formik])
    //-----------------------------------------------------------------
    useEffect(() => {
        if (clear)
        {
            formik.resetForm()
            setClear(false)
        }
    }, [clear, formik])

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <FormCard
            type='navigation'
            title='Transactions'
            submit={submit}
            setSubmit={setSubmit}
            clear={clear}
            setClear={setClear}
        >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
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
                    <Grid item md={6}>
                        <TextField
                            fullWidth
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
