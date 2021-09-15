import { takeLatest, call, put, all } from "redux-saga/effects";

import {
    firestore,
    convertCollectionsSnapToMap,
} from "../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
} from "./shop.actions";

import { ShopActionTypes } from "./shops.types";

export function* fetchCollectionsAsync() {
    yield console.log("i am fired");

    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollectionsSnapToMap,
            snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}
