import { Modal, ModalBody } from 'flowbite-react';
import React, { useState } from 'react';
import Input from '../Input';
import { UserAuth } from '../Context/Auth';
import { addDoc, collection, fetchFromFireStore, fireStore } from '../../utils/Firebase';
import loading from '../../assets/loading.gif';
import fileUpload from '../../assets/fileUpload.svg';
import close from '../../assets/close.svg';

function Sell({ toggleModalSell, status, setItems }) {
  const [title, setTittle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const auth = UserAuth();

  const handleImageUpload = (e) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.user) {
      alert('please login to continue');
      return;
    }

    setSubmitting(true);

    const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result;
          localStorage.setItem(`image_${file.name}`, imageUrl);
          resolve(imageUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    let imageUrl = '';
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image);
      } catch (error) {
        console.log(error);
        alert('Failed to upload image');
        setSubmitting(false);
        return;
      }
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription) {
      alert('All fields are required');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(fireStore, 'products'), {
        title,
        category,
        price,
        description,
        imageUrl,
        userId: auth.user.uid,
        userName: auth.user.displayName || 'Anonymous',
        createAt: new Date().toDateString(),
      });

      setImage(null);
      const datas = await fetchFromFireStore();
      setItems(datas);
      toggleModalSell();
      alert('Submitted');
    } catch (error) {
      console.log(error);
      alert('Failed to add items to the Firestore');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={status}
      onClose={() => {
        toggleModalSell();
        setImage(null);
      }}
      theme={{
        content: {
          base: 'relative w-full p-4 md:h-auto',
          inner: 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700',
        },
      }}
      size="md"
      popup={true}
      position="center"
    >
      <ModalBody
        className="bg-white h-96 p-0 rounded-md"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          onClick={() => {
            toggleModalSell();
            setImage(null);
          }}
          className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
          src={close}
          alt="Close"
        />

        <div className="p-6 pl-8 pr-8 pb-8">
          <p className="font-bold text-lg mb-3">Sell Item</p>

          <form onSubmit={handleSubmit}>
            <Input setInput={setTittle} placeholder={'Title'} />
            <Input setInput={setCategory} placeholder={'Category'} />
            <Input setInput={setPrice} placeholder={'Price'} />
            <Input setInput={setDescription} placeholder={'Description'} />

            <div className="pt-2 w-full relative">
              {image ? (
                <div className="relative h-40 sm:h-60 w-full flex justify-center items-center border-2 border-black border-solid rounded-md overflow-hidden">
                  <img
                    className="object-contain max-h-full"
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-white border border-black text-black text-xs px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30"
                    required
                  />
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                    <img className="w-12" src={fileUpload} alt="Upload Icon" />
                    <p className="text-center text-sm pt-2">Click to upload images</p>
                    <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                  </div>
                </div>
              )}
            </div>

            {submitting ? (
              <div className="w-full flex h-14 justify-center pt-4 pb-2">
                <img className="w-32 object-cover" src={loading} alt="Loading" />
              </div>
            ) : (
              <div className="w-full pt-2">
                <button
                  className="w-full p-3 rounded-lg text-white cursor-pointer"
                  style={{ backgroundColor: '#002f34' }}
                >
                  Sell Item
                </button>
              </div>
            )}
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default Sell;
