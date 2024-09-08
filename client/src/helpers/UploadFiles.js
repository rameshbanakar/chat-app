const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDANARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");
  const respose = await fetch(url, { method: "post", body: formData });
  const responseData = await respose.json();
  return responseData;
};
export default uploadFile;
