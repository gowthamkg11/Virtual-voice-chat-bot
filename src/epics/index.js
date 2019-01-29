/* eslint-disable react/react-in-jsx-scope */
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import 'rxjs';
import SockJsClient from "react-stomp";

import {
    FETCH_VALUE,
    fetchValuesFailure,
    fetchValuesSuccess
} from "../actions";
import React from "react";

export const rootEpic = combineEpics(fetchWhiskiesEpic)
const url = 'https://evening-citadel-85778.herokuapp.com/whiskey/';

function fetchWhiskiesEpic(action$) { // action$ is a stream of actions
    // action$.ofType is the outer Observable
    const wsSourceUrl = "http://localhost:8080" + "/handler"
    return action$
        .ofType(FETCH_VALUE) // ofType(FETCH_WHISKIES) is just a simpler version of .filter(x => x.type === FETCH_WHISKIES)

            return(
                    <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
                              onMessage={ data => fetchValuesSuccess(data) } ref={ (client) => { this.clientRef = client }}
                              />
                )

        //.map(whiskies => fetchValuesSuccess(whiskies)) // map the resulting array to an action of type FETCH_WHISKIES_SUCCESS
        // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
        // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
        //.catch(error => Observable.of(fetchValuesFailure(error.message)))
}
