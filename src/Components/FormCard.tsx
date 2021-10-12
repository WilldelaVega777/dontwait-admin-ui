//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React               from 'react'
import { useState }             from 'react'
import Card                     from '@mui/material/Card'
import CardActions              from '@mui/material/CardActions'
import ButtonGroup              from '@mui/material/ButtonGroup'
import Button                   from '@mui/material/Button'
import DialogTitle              from '@mui/material/DialogTitle'
import DialogContent            from '@mui/material/DialogContent'
import DialogActions            from '@mui/material/DialogActions'
import Dialog                   from '@mui/material/Dialog'
import Typography               from '@mui/material/Typography'
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
    canRew?: boolean
    canFwd?: boolean
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
    setCommand,
    canRew,
    canFwd
}: IFormCardProps) => {

    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [mode, setMode] = useState('navigate')
    const [dialogOpen, setDialogOpen] = useState(false)

    //-----------------------------------------------------------------
    // Eventhandler Methods Section
    //-----------------------------------------------------------------
    const handleSubmit = () => {
        setCommand(Commands.Save)
        setMode('navigate')
    }
    //-----------------------------------------------------------------
    const handleClear = () => {
        setCommand(Commands.Cancel)
        setMode('navigate')
    }
    //-----------------------------------------------------------------
    const handleDialogCancel = () => {
        setDialogOpen(false)
    }
    //-----------------------------------------------------------------
    const handleDialogOk = () => {
        setCommand(Commands.Remove)
        setDialogOpen(false)
    }
    //-----------------------------------------------------------------
    const handleCommand = (pCommand: Commands) => {
        setCommand(pCommand)
        if (
            (pCommand === Commands.Cancel) ||
            (pCommand === Commands.Save)
        )
        {
            setMode('navigate')
        }
        else if (
            (pCommand === Commands.Update) ||
            (pCommand === Commands.Add)
        )
        {
            setMode('actions')
        }
        else if (pCommand === Commands.Remove)
        {
            setDialogOpen(true)
        }
    }

    //-----------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------
    return (
        <>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={dialogOpen}
            >
            <DialogTitle>Do you really want to delete this record?</DialogTitle>
            <DialogContent dividers>
                <Typography>
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleDialogCancel}>
                    Cancel
                </Button>
                <Button onClick={handleDialogOk}>
                    Ok
                </Button>
            </DialogActions>
            </Dialog>
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
                                        <ButtonStyled
                                            size="large"
                                            onClick={() => handleCommand(Commands.First)}
                                            disabled={!canRew}
                                        >
                                            <FirstPageIcon/>
                                        </ButtonStyled>
                                        <ButtonStyled
                                            size="large"
                                            onClick={() => handleCommand(Commands.Previous)}
                                            disabled={!canRew}
                                        >
                                            <NavigateBeforeIcon/>
                                        </ButtonStyled>
                                        <ButtonStyled
                                            size="large"
                                            onClick={() => handleCommand(Commands.Next)}
                                            disabled={!canFwd}
                                        >
                                            <NavigateNextIcon/>
                                        </ButtonStyled>
                                        <ButtonStyled
                                            size="large"
                                            onClick={() => handleCommand(Commands.Last)}
                                            disabled={!canFwd}
                                        >
                                            <LastPageIcon/>
                                        </ButtonStyled>
                                    </ButtonGroup>
                                </ButtonIconsContainer>

                                <Button
                                    size="medium"
                                    onClick={() => handleCommand(Commands.Remove)}
                                >
                                    Remove
                                </Button>
                                <Button
                                    size="medium"
                                    onClick={() => handleCommand(Commands.Update)}
                                >
                                    Update
                                </Button>
                                <Button
                                    size="medium"
                                    onClick={() => handleCommand(Commands.Add)}
                                >
                                    Add
                                </Button>

                            </NavigationContainer>
                        }
                        { mode === 'actions' &&
                            <ActionsContainer>
                                <Button
                                    size="medium"
                                    onClick={handleClear}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="medium"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                            </ActionsContainer>
                        }
                    </CardActionsStyled>
                </FormCardContainer>
            </Card>
        </>
    )
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default FormCard
