const images = (
  state = { fileNames: new Set(), imageList: [] },
  action
) => {
  switch(action.type) {
  case "addImages": {
    const files = action.payload;
    let newImageList = [];
    let newFileNames = [];

    for (const file of files) {
      if (state.fileNames.has(file.name)) continue;
      newFileNames.push(file.name);

      let img = new Image();
      img.src = URL.createObjectURL(file);
      img.title = file.name;
      newImageList.push(img);
    }

    if (state.imageList.length === 0 && newImageList.length !== 0) {
      // auto apsect ratio?
    }

    return {
      fileNames: new Set([...state.fileNames, ...newFileNames]),
      imageList: [...state.imageList, ...newImageList]
    };
  }
  case "deleteImage": {
    const fileName = action.payload;
    if (!state.fileNames.has(fileName)) return state;

    // no functional way to delete items :(
    const fileNames = new Set(state.fileNames);
    fileNames.delete(fileName);

    const newState = {
      fileNames,
      imageList: state.imageList.filter(image => image.title !== fileName)
    };

    return newState;
  }
  default:
    return state;
  }
};

export default images;