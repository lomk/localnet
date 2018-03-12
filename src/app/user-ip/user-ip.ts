import {User}       from '../user/user';
import {LocalIp}    from '../local-ip/local-ip';

export class UserIp {
    id:             number;
    firstOctet:     number;
    secondOctet:    number;
    thirdOctet:     number;
    lastOctet:      number;
    user:           User;
    localIp:        LocalIp;
}
