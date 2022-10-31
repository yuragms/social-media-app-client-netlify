import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import { useMediaQuery } from "react-responsive";
import "./ProfileModal.css";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const isMin1400 = useMediaQuery({
    query: "(min-width: 1400px)",
  });
  const isMin1100 = useMediaQuery({
    query: "(min-width: 1100px)",
  });
  const isMin570 = useMediaQuery({
    query: "(min-width: 570px)",
  });

  // const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      console.log(" work1");
      const data = new FormData();
      // const fileName = Date.now() + profileImage.name;
      const fileName = "avatar/" + Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        console.log(profileImage);
        console.log(UserData);
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      console.log(" work2");
      console.log(profileImage);
      const data = new FormData();
      // const fileName = Date.now() + coverImage.name;
      const fileName = "cover/" + Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    // dispatch(updateUser(param.id, UserData));
    const updateUserMongo = () => {
      dispatch(updateUser(param.id, UserData));
    };
    setTimeout(updateUserMongo, 1300);

    clearTimeout(updateUserMongo);

    setModalOpened(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size={isMin1400 ? "55%" : isMin1100 ? "65%" : isMin570 ? "85%" : "95%"}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoFormModal">
        <h3>Your info</h3>
        {/* <div> */}
        <div>
          <input
            type="text"
            className="infoInputModal"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInputModal"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInputModal"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInputModal"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInputModal"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        {/* </div> */}
        <div className="inputImageModal">
          <div>
            Profile Image
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>
        <button className="button infoButton modalBtn" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
