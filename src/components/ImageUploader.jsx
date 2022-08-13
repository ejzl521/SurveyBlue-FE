import { Button } from "antd";
import "./imageuploader.scss";

import { PictureTwoTone } from "@ant-design/icons";

const ImageUploader = (props) => {
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      props.upload_img(e.target.files[0], fileReader.result);
    };
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
        onClick={(e) => {
          e.target.value = null;
        }}
      />
      <div className="img-wrapper">
        {props.loaded === false ? <PictureTwoTone className="default-img" /> : <img src={props.preview_URL} alt="" />}
      </div>
      <div className="upload-button">
        {props.loaded === false ? (
          <Button type="primary" onClick={() => inputRef.click()}>
            사진 추가
          </Button>
        ) : (
          <Button type="primary" onClick={() => inputRef.click()}>
            사진 변경
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
