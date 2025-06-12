import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'flowbite-react';
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../utils/Firebase';
import close from '../assets/close.svg';

function EditAd({ status, toggleModalEdit, ad, onSave }) {
  const [formData, setFormData] = useState(ad || {});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ad) {
      setFormData(ad);
    }
  }, [ad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const adRef = doc(fireStore, 'products', ad.id);
      await updateDoc(adRef, formData);
      onSave();
      toggleModalEdit();
      alert('Ad updated successfully!');
    } catch (error) {
      console.error('Error updating ad:', error);
      alert('Failed to update ad.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!status || !ad) return null;

  return (
    <Modal
      show={status}
      onClose={() => {
        toggleModalEdit();
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
        className="bg-white p-0 rounded-md"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          onClick={toggleModalEdit}
          className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
          src={close}
          alt="Close"
        />

        <div className="p-6 pl-8 pr-8 pb-8">
          <p className="font-bold text-lg mb-3">Edit Ad</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border-2 border-black rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category || ''}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border-2 border-black rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border-2 border-black rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border-2 border-black rounded-md p-2"
                rows={4}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full p-3 rounded-lg text-white"
                style={{ backgroundColor: '#002f34' }}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default EditAd;
