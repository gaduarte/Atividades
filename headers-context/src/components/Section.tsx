import { useContext, ReactNode } from 'react';
import { LevelContext } from '../context/LevelContext';

export interface SectionProps {
    children: ReactNode;
    isSofisticada: boolean;
  }

export default function Section({children, isSofisticada}: SectionProps){
    const level = useContext(LevelContext);
    const sectionClassName = isSofisticada ? 'sofisticada': 'section';
    return(
        <section className={sectionClassName}>
        <LevelContext.Provider value={level + 1}>
            {children}
        </LevelContext.Provider>
        </section>
    );
}