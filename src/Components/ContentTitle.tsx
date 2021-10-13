//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import * as React           from 'react';
import Typography           from '@mui/material/Typography'
import styled               from 'styled-components'


//---------------------------------------------------------------------
// Styles Section
//---------------------------------------------------------------------
const Title = styled.h1`
    font-family: Arial, Geneva;
    font-size: 2.5em;
    margin-block-start: 0px !important;
    margin-bottom: 5px;
    padding-bottom: 4px;
    border-bottom: 2px solid orange;
`

//---------------------------------------------------------------------
// Component Interfaces Section
//---------------------------------------------------------------------
interface IContentTitleProps {
    title: string
}

//---------------------------------------------------------------------
// Component Definition Section
//---------------------------------------------------------------------
const ContentTitle = ({ title }: IContentTitleProps) => {
    return (
            <Title>
                { title }
            </Title>
    )
}


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default ContentTitle
