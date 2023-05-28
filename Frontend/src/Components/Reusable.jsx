import { toast } from "react-toastify"
export const cssStyles = {
  boxShadow1: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
  boxShadow2: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  medium: "1.4rem",
  small: "1rem",
}


// export const Api_Link = `http://localhost:8080`;
export const Api_Link = `https://wild-plum-kitten-tutu.cyclic.app`

export const succesAlert = (message, theme) => {
  toast.success(message, { theme, position: "top-center" })
}
export const errorAlert = (message, theme) => {
  toast.error(message, { theme, position: "top-center" })
}

export const infoAlert = (message, theme) => {
  toast.info(message, { theme, position: "top-center" })
}
export const warningAlert = (message, theme) => {
  toast.warning(message, { theme, position: "top-center" })
}
export const defaultAlert = (message, theme) => {
  toast(message, { theme, position: "top-center" })
}

export const uploadFilesFunction = async (image) => {
  try {
    const filesData = new FormData()
    filesData.append("file", image)
    filesData.append("upload_preset", "hanumatdemoapp")
    filesData.append("cloud_name", "dtkgxbbb7")

    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dtkgxbbb7/image/upload`,
      {
        method: "POST",
        body: filesData,
      }
    )
    let after = await res.json()
    return after.secure_url
  } catch (error) {}
}
