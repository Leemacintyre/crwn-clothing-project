import { ShopActionTypes } from "./shops.types";
import {
    firestore,
    convertCollectionsSnapToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    payload: collectionsMap,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection("collections");

        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = convertCollectionsSnapToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
    };
};
