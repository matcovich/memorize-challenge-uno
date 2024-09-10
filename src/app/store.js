import { configureStore } from '@reduxjs/toolkit';

    const initialState = {
    imageList: [],
    selectedImages: [],
    duplicatedImages: [],
    difficulty: 'easy',
    flipped: [],
    };

    function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_IMAGE_LIST':
        return { ...state, imageList: action.payload };
        case 'SET_SELECTED_IMAGES':
        return { ...state, selectedImages: action.payload };
        case 'SET_DUPLICATED_IMAGES':
        return { ...state, duplicatedImages: action.payload };
        case 'SET_DIFFICULTY':
        return { ...state, difficulty: action.payload };
        case 'SET_FLIPPED':
        return { ...state, flipped: action.payload };
        default:
        return state;
    }
    }

    const store = configureStore({
        reducer,
        middleware: [thunkMiddleware],
    });

    export default store;