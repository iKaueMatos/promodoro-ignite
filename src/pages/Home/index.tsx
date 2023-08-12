import * as zod from 'zod';
import { HandPalm, Play } from "phosphor-react";
import { Countdown } from './components/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import { useContext} from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { HomeContainer, StartCountdownButton, StopCountdownButton, } from "./styles";
import { CyclesContext } from '../../context/CyclesContext';

const newCycleFormValidationSchema = zod.object ({
    task:zod.string()
    .min(1, 'Informe a tarefa'), 
    minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no minimo 1 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
   const { createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { 
        handleSubmit, 
        watch, 
        reset 
    } = newCycleForm;

    //Watch => Capturando o valor que esta dentro do campo
    const taskWatch = watch('task');
    const isSubmitDisabled = !taskWatch;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
          
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    
                    <Countdown/>

                {activeCycle ? (
                   
                   <StopCountdownButton onClick={interruptCurrentCycle}type="button">
                        <HandPalm size={24} weight="fill" />
                        Interroper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} weight="fill" />
                        Começar
                    </StartCountdownButton>
                )}

            </form>
        </HomeContainer>
    )
}