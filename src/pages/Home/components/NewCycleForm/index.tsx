import { useFormContext } from "react-hook-form";
import { FormContainer, MinuteAmount, TaskInput } from "./styled";
import { useContext } from "react";
import { CyclesContext } from "../../../../context/CyclesContext";


export function NewCycleForm() {
	const { activeCycle } = useContext(CyclesContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
				
					<TaskInput 
						id="task" 
						placeholder="De um nome para o seu projeto"
						list="task-suggestations"
						{...register('task')}
						disabled={!!activeCycle}
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
						placeholder="0"
						min={1}
						max={60}
						disabled={!!activeCycle}
						//Definindo o tipo de valor que queremos que seja retornado nesse 
						//caso sera do tipo nuber
						{...register('minutesAmount', { valueAsNumber: true })}
					/> 

					<span>minutos.</span>
		</FormContainer>
	)
}