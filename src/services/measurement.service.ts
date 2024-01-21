import { api } from "./api"

export function getMeasurement() {
    return api.get(`/measurement`);
}
