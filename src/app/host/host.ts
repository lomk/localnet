import {Port} from './port';
import {Place} from '../place/place';

export class Host {
    id: number;
    hostname: string;
    ipAddress: string;
    macAddress: string;
    isUp: boolean;
    scanTime: String;
    place: Place;
    ports: Port[];
}
