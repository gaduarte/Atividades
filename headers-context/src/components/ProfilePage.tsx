import Heading from "./Heading";
import Section from './Section';

export default function ProfilePage(){
    return(
        <Section isSofisticada={true}>
            <Heading>Titulo</Heading>
            <Section  isSofisticada={true}>
            <Heading>H2 - exemplo</Heading>
            <Heading>H2 - exemplo02</Heading>
            <Section  isSofisticada={true}>
                <Heading>H3 - exemplo 03</Heading>
                <Heading>H3 - exemplo 04</Heading>
            <Section  isSofisticada={true}>
                <Heading>H4 - exemplo 05</Heading>
                <Heading>H4 - exemplo 06</Heading>
            <Section  isSofisticada={true}>
                <Heading>H5 - exemplo 07</Heading>
                <Heading>H5 - exemplo 08</Heading>
            <Section  isSofisticada={true}>
                <Heading>H6 - exemplo 09</Heading>
                <Heading>H6 - exemplo 10</Heading>
            </Section>
            </Section>
            </Section>
            </Section>
            </Section>
            </Section>
        
    )
}