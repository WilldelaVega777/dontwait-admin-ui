//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'

import TextField                from '@mui/material/TextField'
import Grid                     from '@mui/material/Grid'
import styled                   from 'styled-components'
import FormCard                 from '../Components/FormCard'
import IRestaurant              from '../Models/Interfaces/IRestaurant'


//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const TextFieldStyled = styled(TextField)`
    min-width: 100%;
    width: 100%;
`


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const Restaurants = () => {

    return (
        <FormCard
            type='navigation'
            title='Restaurants'
        >
            <form>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextFieldStyled
                            id="standard-basic"
                            label="Restaurant Name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextFieldStyled
                            id="standard-basic"
                            label="Image Url"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </form>
        </FormCard>
    )
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default Restaurants
