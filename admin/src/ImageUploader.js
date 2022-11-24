export const ImageUploader = (file) => {
    if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uzdev_overflow");
        data.append("cloud_name", "defsmhgn9");
        fetch(`https://api.cloudinary.com/v1_1/defsmhgn9/image/upload`, {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            return data.url;
          })
          .catch((err) => console.log(err));
      }
}