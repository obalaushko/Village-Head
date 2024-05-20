import { createPersonType } from '@/types/Person.ts';
import { Villager } from './Villager.ts';

export class VillagerWithIssues extends Villager {

	constructor(PersonData: createPersonType) {
		super(PersonData);

	}

	public addProblem(problem: string) {
		this.problems.push(problem);
		this.calculateHappiness();
	}

	public removeProblem(problem: string) {
		const index = this.problems.indexOf(problem);
		if (index > -1) {
			this.problems.splice(index, 1);
		}
		this.calculateHappiness();
	}


	protected calculateHappiness() {
		super.calculateHappiness();
		this.setHappiness(this.happiness - this.problems.length * 10);
	}
}
