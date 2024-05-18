import { Villager } from "./Villager.ts";

export class VillagerWithIssues extends Villager {
	private problems: string[] = [];

	constructor(fullName: string, age: number, sex: string) {
		super(fullName, age, sex);
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
