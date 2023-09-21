import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useUpdateContext from "../hooks/useUpdateContext";
import { FileInput, Label, Modal } from "flowbite-react";
import { User, toast_options, userData } from "../utilities/constants";

interface Props {
  user: User;
}

export default function UpdatePhoto({ user }: Props) {
  const [file, setFile] = useState<File | null>();
  const { setUpdate } = useUpdateContext();
  const [openModal, setOpenModal] = useState<boolean | undefined>();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const updateProfile = async () => {
    let form_data = new FormData();

    const user_data: userData = JSON.parse(localStorage.getItem("user")!);

    if (file !== undefined) {
      form_data.append("pictures", file!);

      try {
        await axios.put("/users/update-photo", form_data, {
          headers: {
            Authorization: `Bearer ${user_data.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Profile has been updated", toast_options);

        setOpenModal(false);
        setUpdate(true);
      } catch (error: any) {
        const { data } = error.response;
        console.log(data.error);
      }
    }
  };

  return (
    <>
      <div
        className="rounded-full overflow-hidden border w-10 h-10 hover: cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_SERVER}/${user?.photo}`}
          alt="user profile picture"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 font-poppins">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Your Profile Picture
            </h3>
            <form className="max-w-md" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                helperText="A profile picture is useful to confirm your are logged into your account"
                id="file"
                onChange={handleUpload}
              />
            </form>

            <button
              className="p-2 bg-purple-600 text-white rounded w-full"
              onClick={updateProfile}
            >
              Update Picture
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
