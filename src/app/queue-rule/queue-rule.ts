import {RemoteIp} from '../remote-ip/remote-ip';
import {LocalIp} from '../local-ip/local-ip';
import {TrafficQueue} from '../traffic-queue/traffic-queue';
import {QueueType} from '../queue-type/queue-type';

export class QueueRule {
    id: number;
    localIp: LocalIp;
    remoteIp: RemoteIp;
    trafficQueue: TrafficQueue;
    queueType: QueueType;
}
