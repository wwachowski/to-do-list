import { Section } from "./section";

export interface User {
    id: number,
    name: string,
    token: string,
    sections: Array<Section>
}