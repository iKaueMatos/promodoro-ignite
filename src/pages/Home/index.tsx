import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Componentes do styledComponents
import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinuteAmount, 
    Separator, 
    StartCountdownButton, 
    TaskInput
} from "./styles";

import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object ({
    task:zod.string()
    .min(1, 'Informe a tarefa'), 
    minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
});


// Outro caso para definir o tipo de dados que estão sendo 
// retornados do formulário utilizando <Generics> && interface
// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {

    const { register, handleSubmit, watch, reset, formState } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });
    
    //Watch => Capturando o valor que esta dentro do campo
    const taskWatch = watch('task');
    const isSubmitDisabled = !taskWatch;

    //Recebendo data => dados como parametro para conseguimos manipula-los 
    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
        reset();
    }

    console.log(formState.errors);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    
                    <TaskInput 
                        id="task" 
                        placeholder="De um nome para o seu projeto"
                        list="task-suggestations"
                        {...register('task')}
                    />

                    <datalist id="task-suggestations">
                        <option value="Desenvolvendo um novo projeto" />
                        <option value="Estudos para a faculdade" />
                        <option value="Programando" />
                    </datalist>

                    <label htmlFor="minutesAmout">durante</label>
                    <MinuteAmount 
                        type="number" 
                        id="minutesAmount"
                        placeholder="00"
                        step={5} 
                        min={5}
                        max={60}
                        //Definindo o tipo de valor que queremos que seja retornado nesse 
                        //caso sera do tipo nuber
                        {...register('minutesAmount', { valueAsNumber: true })}
                    /> 
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} weight="fill" />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}