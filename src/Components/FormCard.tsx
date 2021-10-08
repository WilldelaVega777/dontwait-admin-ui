//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useState }             from 'react'

import Card                     from '@mui/material/Card'
import CardActions              from '@mui/material/CardActions'
import ButtonGroup              from '@mui/material/ButtonGroup'
import Button                   from '@mui/material/Button'

import FirstPageIcon            from '@mui/icons-material/FirstPage'
import LastPageIcon             from '@mui/icons-material/LastPage'
import NavigateBeforeIcon       from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon         from '@mui/icons-material/NavigateNext'

import styled                   from 'styled-components'

import ContentTitle             from './ContentTitle'


//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const FormCardContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
    padding: 30px;
    padding-top: 25px;
    padding-bottom: 0px;
`

const FormCardTitleContainer = styled.div`
    min-height: 60px;
    height: 60px;
    max-height: 60px;
    min-width: 100%;
`

const CardContentContainer = styled.div`
    flex: 1;
    padding: 10px;
    padding-left: 0px;
    padding-top: 30px;
    min-width: 100%;
`

const CardActionsStyled = styled(CardActions)`
    display: flexbox;
    flex-direction: row;
    justify-content: flex-end;
    align-content: flex-end;
    min-height: 50px;
    height: 50px;
    max-height: 50px;
    border-top: 2px solid orange;
    padding-top: 16px;
    width: calc(100% - 17px);
`

const ButtonStyled = styled(Button)`
    font-size: 1.4em;
    max-width: 30px;
    width: 30px;
    min-width: 30px;
`

const NavigationContainer = styled.span`
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: flex-end;
    min-width: 300px;
`

const ButtonIconsContainer = styled.span`
    margin-right: 20px;
`

const ActionsContainer = styled.span`
    margin-right: 0px;
`


//---------------------------------------------------------------------
// Component Interfaces Section
//---------------------------------------------------------------------
interface IFormCardProps {
    type: string
    title: string
    submit?: boolean
    setSubmit?: any
    clear?: boolean
    setClear?: any
    children: string | JSX.Element | JSX.Element[]
}


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const FormCard = ({
    type,
    title,
    children,
    submit,
    setSubmit,
    clear,
    setClear
}: IFormCardProps) => {

    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [mode, setMode] = useState('actions')


    //-----------------------------------------------------------------
    // Eventhandler Methods Section
    //-----------------------------------------------------------------
    const handleSubmit = () => {
        setSubmit(true)
    }

    //-----------------------------------------------------------------
    const handleClear = () => {
        setClear(true)
    }

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 275,
                maxWidth: 'calc(100vw - 380px)',
                minHeight: 'calc(100vh - 160px)'
            }}
        >
            <FormCardContainer>
                <FormCardTitleContainer>
                    <ContentTitle
                        title={ title }
                    />
                </FormCardTitleContainer>

                <CardContentContainer>
                    { children }
                </CardContentContainer>

                <CardActionsStyled>
                    { mode === 'navigate' &&
                        <NavigationContainer>
                            <ButtonIconsContainer>
                                <ButtonGroup variant='outlined'>
                                    <ButtonStyled size="large"><FirstPageIcon/></ButtonStyled>
                                    <ButtonStyled size="large"><NavigateBeforeIcon/></ButtonStyled>
                                    <ButtonStyled size="large"><NavigateNextIcon/></ButtonStyled>
                                    <ButtonStyled size="large"><LastPageIcon/></ButtonStyled>
                                </ButtonGroup>
                            </ButtonIconsContainer>
                            <Button size="medium">Remove</Button>
                            <Button size="medium">Update</Button>
                            <Button size="medium">Add</Button>
                        </NavigationContainer>
                    }
                    { mode === 'actions' &&
                        <ActionsContainer>
                            <Button size="medium" onClick={handleClear}>Cancel</Button>
                            <Button size="medium" onClick={handleSubmit}>Save</Button>
                        </ActionsContainer>
                    }
                </CardActionsStyled>
            </FormCardContainer>
        </Card>
    )
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default FormCard
