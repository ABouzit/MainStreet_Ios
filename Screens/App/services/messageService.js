import {BehaviorSubject} from 'rxjs';
const subscriber = new BehaviorSubject(false);
const subscriberRedirect = new BehaviorSubject('Recherche');
const subscriberDrawerProfil = new BehaviorSubject(true);
const messageService = {
  send: function(msg) {
    subscriber.next(msg);
  },
};
export {messageService, subscriber, subscriberRedirect, subscriberDrawerProfil};
