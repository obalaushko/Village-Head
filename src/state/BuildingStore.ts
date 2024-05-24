import { makeAutoObservable } from "mobx";

class BuildingStore {
	constructor() {
		makeAutoObservable(this);
	}
}

const buildingStore = new BuildingStore();
export default buildingStore;
