import {Port} from './port';

export class Host {
    id: number;
    address: string;
    macAddress: string;
    isUp: boolean;
    ports: Port[];
}
