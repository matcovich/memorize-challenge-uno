export const setImageList = (imageList) => ({
        type: 'SET_IMAGE_LIST',
        payload: imageList,
    });

    export const setSelectedImages = (selectedImages) => ({
        type: 'SET_SELECTED_IMAGES',
        payload: selectedImages,
    });

    export const setDuplicatedImages = (duplicatedImages) => ({
        type: 'SET_DUPLICATED_IMAGES',
        payload: duplicatedImages,
    });

    export const setDifficulty = (difficulty) => ({
        type: 'SET_DIFFICULTY',
        payload: difficulty,
    });

    export const setFlipped = (flipped) => ({
        type: 'SET_FLIPPED',
        payload: flipped,
    });