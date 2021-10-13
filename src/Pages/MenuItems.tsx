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
import InputLabel               from '@mui/material/InputLabel'
import MenuItem                 from '@mui/material/MenuItem'
import FormControl              from '@mui/material/FormControl'
import Select                   from '@mui/material/Select'
import { SelectChangeEvent }    from '@mui/material/Select'
import { useAppDispatch }       from '../Hooks/useRedux'
import { useAppSelector }       from '../Hooks/useRedux'
import { getMenuItems }         from '../Redux/Reducers/menuItem.reducer'
import { addMenuItem }          from '../Redux/Reducers/menuItem.reducer'
import { updateMenuItem }       from '../Redux/Reducers/menuItem.reducer'
import { removeMenuItem }       from '../Redux/Reducers/menuItem.reducer'
import { getRestaurants }       from '../Redux/Reducers/restaurant.reducer'
import { setLoading }           from '../Redux/Reducers/system.reducer';
import { setError }             from '../Redux/Reducers/system.reducer';
import FormCard                 from '../Components/FormCard'
import Commands                 from '../Models/Enums/Commands'
import IMenuItem                from '../Models/Interfaces/IMenuItem'


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const MenuItems = () => {
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

    // Redux Slices
    const {
        menuItems,
        loading,
        error,
        message
    } = useAppSelector(
        state => state.menuItems
    )
    const {
        restaurants
    } = useAppSelector(
        state => state.restaurants
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
            name: (menuItems.length > 0) ?
                menuItems[positionRef.current].name :
                '',
            description: (menuItems.length > 0) ?
                menuItems[positionRef.current].description :
                '',
            restaurant_id: (menuItems.length > 0) ?
                menuItems[positionRef.current].restaurant_id :
                    '',
            image:  (menuItems.length > 0) ?
                menuItems[positionRef.current].image :
                '',
            price: (menuItems.length > 0) ?
                menuItems[positionRef.current].price :
                0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let menuItem
            const formerAction: Commands =
                history[pointer - PREVIOUS_STATE_STEPS]

            if (formerAction === Commands.Add)
            {
                menuItem = { ...values }
                dispatch(addMenuItem(menuItem))
                positionRef.current = 0
            }
            else if (formerAction === Commands.Update)
            {
                menuItem = {
                    id: menuItems[positionRef.current].id,
                    ...values
                }
                dispatch(updateMenuItem(menuItem))
            }
        }
    })

    //-----------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //-----------------------------------------------------------------
    useEffect(() => {
        dispatch(getMenuItems())
        dispatch(getRestaurants())
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
                    (positionRef.current < (menuItems.length-1) ?
                        (positionRef.current +1): positionRef.current)
                break;
            case Commands.Last:
                positionRef.current = (menuItems.length -1)
                break;
            case Commands.Remove:
                dispatch(removeMenuItem(
                    menuItems[positionRef.current].id as string
                ))
                break;
            case Commands.Update:
                break;
            case Commands.Add:
                formik.setValues({
                    name          : '',
                    description   :  '',
                    restaurant_id : '',
                    image         : '',
                    price         : 0
                } as IMenuItem)
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
            title='Menu Items'
            command={command}
            setCommand={setCommand}
            canRew={positionRef.current !== 0}
            canFwd={positionRef.current < (menuItems.length -1)}
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
                            type="text"
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
                    <Grid item md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Restaurant
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.restaurant_id}
                                label="Restaurant"
                                onChange={(event: SelectChangeEvent) => {
                                    formik.values.restaurant_id = (event.target.value as string)
                                }}
                                variant='standard'
                            >
                                { restaurants.map((restaurant) => (
                                    <MenuItem value={restaurant.id}>{restaurant.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={9}>
                        <TextField
                            fullWidth
                            disabled={isDisabled()}
                            id="image"
                            name="image"
                            label="Image"
                            type="text"
                            variant="standard"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.image
                                &&
                                Boolean(formik.errors.image)
                            }
                            helperText={
                                formik.touched.image
                                &&
                                formik.errors.image
                            }
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            fullWidth
                            disabled={isDisabled()}
                            id="price"
                            name="price"
                            label="Price"
                            variant="standard"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.price
                                &&
                                Boolean(formik.errors.price)
                            }
                            helperText={
                                formik.touched.price
                                &&
                                formik.errors.price
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
export default MenuItems
