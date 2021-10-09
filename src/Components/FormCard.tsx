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
import Commands                 from '../Models/Enums/Commands'


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
    min-height: 60px;
    height: 60px;
    max-height: 60px;
    border-top: 2px solid orange;
    padding-top: 14px;
    padding-bottom: 14px;
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
    command?: Commands
    setCommand?: any
    children: string | JSX.Element | JSX.Element[]
}


//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const FormCard = ({
    type,
    title,
    children,
    command,
    setCommand
}: IFormCardProps) => {

    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [mode, setMode] = useState('navigate')


    //-----------------------------------------------------------------
    // Eventhandler Methods Section
    //-----------------------------------------------------------------
    const handleFirst = () => {
        setCommand(Commands.First)
    }
    //-----------------------------------------------------------------
    const handlePrevious = () => {
        setCommand(Commands.Previous)
    }
    //-----------------------------------------------------------------
    const handleNext = () => {
        setCommand(Commands.Next)
    }
    //-----------------------------------------------------------------
    const handleLast = () => {
        setCommand(Commands.Last)
    }
    //-----------------------------------------------------------------
    const handleRemove = () => {
        setMode('actions')
        setCommand(Commands.Remove)
    }
    //-----------------------------------------------------------------
    const handleUpdate = () => {
        setMode('actions')
        setCommand(Commands.Update)
    }
    //-----------------------------------------------------------------
    const handleAdd = () => {
        setMode('actions')
        setCommand(Commands.Add)
    }
    //-----------------------------------------------------------------
    const handleSubmit = () => {
        setCommand(Commands.Save)
        // After Saving
        setMode('navigate')
    }
    //-----------------------------------------------------------------
    const handleClear = () => {
        setCommand(Commands.Cancel)
        setMode('navigate')
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
                                    <ButtonStyled size="large" onClick={handleFirst}>
                                        <FirstPageIcon/>
                                    </ButtonStyled>
                                    <ButtonStyled size="large" onClick={handlePrevious}>
                                        <NavigateBeforeIcon/>
                                    </ButtonStyled>
                                    <ButtonStyled size="large" onClick={handleNext}>
                                        <NavigateNextIcon/>
                                    </ButtonStyled>
                                    <ButtonStyled size="large" onClick={handleLast}>
                                        <LastPageIcon/>
                                    </ButtonStyled>
                                </ButtonGroup>
                            </ButtonIconsContainer>
                            <Button size="medium" onClick={handleRemove}>Remove</Button>
                            <Button size="medium" onClick={handleUpdate}>Update</Button>
                            <Button size="medium" onClick={handleAdd}>Add</Button>
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
