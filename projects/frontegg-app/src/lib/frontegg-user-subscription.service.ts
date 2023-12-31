import { Subscription, PartialObserver, BehaviorSubject } from 'rxjs';
import { AuthState } from '@frontegg/redux-store';
import { Injectable } from '@angular/core';

import { FronteggState } from '@frontegg/redux-store';
import { FronteggAppService } from './frontegg-app.service';

export type User = FronteggState['auth']['user'];

/**
 * A service for managing user state subscription
 * The service gives the ability to subscribe to user state change and get a manipulated data when the user state changes
 */
@Injectable({
  providedIn: 'root',
})
export class FronteggUserSubscriptionService {
  private userStateSubject = new BehaviorSubject<any>(undefined);
    
  constructor(private fronteggAppService: FronteggAppService) {
    const state = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
    this.updateUserStateIfNeeded(state.auth);

    // Memoized user State
    this.fronteggAppService.fronteggApp.store.subscribe(() => {
      const newState = this.fronteggAppService.fronteggApp.store.getState() as FronteggState;
      this.updateUserStateIfNeeded(newState.auth);
    });
  }

  /**
   * Trigger user subject change event if the user reference changes
   * No need for deep equal because we already check it internally
   * @param authState
   */
  private updateUserStateIfNeeded(authState: AuthState): void {
    const userState = authState.user as User;
    if (this.userStateSubject.value === userState) {
      return;
    }

    this.userStateSubject.next(userState);
  }

  /**
   * The function gives the ability to return a manipulated data of the user state as a subscription.
   *
   * @param dataManipulator Manipulator function that receives user state and returns a manipulated data
   * @param observer For receiving manipulated data result
   * @returns a subscription to be able to unsubscribe
   */
  public getUserManipulatorSubscription<Result>(
    dataManipulator: (user: User) => Result, 
    observer: PartialObserver<Result>
  ): Subscription {
    // used for computing the end user result because we don't return the state itself, but a calculated one
    const userSubject = new BehaviorSubject<Result>(undefined as unknown as Result);
    
    const stateSubscription = this.userStateSubject.subscribe(user => {
      userSubject.next(dataManipulator(user));
    });
    
    // subscribing the consumer observer
    const userResultSubscription = userSubject.asObservable().subscribe(observer)

    // monkey patched to manage both un-subscriptions: state and user manipulated result
    const originalUnsubscribe = userResultSubscription.unsubscribe.bind(userResultSubscription);

    userResultSubscription.unsubscribe = ()=>{
      originalUnsubscribe();
      stateSubscription.unsubscribe();
    };

    return userResultSubscription;
  }  
}
