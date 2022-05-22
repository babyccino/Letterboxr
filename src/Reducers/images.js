const images = (
  state = { fileNames: new Set(), imageList: [] },
  action
) => {
  switch(action.type) {
    case "addImages": {
      const files = action.payload;
      let newImages = [];
      let newFileNames = [];

      for (const file of files) {
        if (state.fileNames.has(file.name)) continue;
        newFileNames.push(file.name);

        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.title = file.name;
        newImages.push(img);
      }

      if (state.imageList.length === 0 && newImages.length !== 0) {
        // auto apsect?
      }

      return {
        fileNames: new Set([...state.fileNames, ...newFileNames]),
        imageList: [...state.imageList, ...newImages]
      };
    }
    default:
      return state;
  }
};

export default images;