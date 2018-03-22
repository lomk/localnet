import {Port} from './port';

export class Host {
    id: number;
    ipAddress: string;
    macAddress: string;
    isUp: boolean;
    ports: Port[];
}
