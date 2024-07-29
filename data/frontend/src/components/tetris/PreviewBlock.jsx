import {Square} from "./Square.jsx";

export const PreviewBlock = () => {
  const size = 16;
  const previewBlock = [];

  for (let index = 0; index < size; index++) {
    previewBlock.push(<Square position={index} key={index} color={'bg-tile'}/>);
  }

  return (
    <div className="preview-block grid grid-cols-4 gap-0 content-start">
      {previewBlock}
    </div>
  );
};