import React, { useEffect, useState } from 'react'
import Navbar from './NavBar/Navbar'
import Login from '../components/Modal/Login';
import Sell from '../components/Modal/Sell';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../utils/Firebase';
import { collection, deleteDoc, doc, Firestore, getDocs, query, where } from 'firebase/firestore';
import EditAd from './Editad';
import Footer from './Footer';

function Myads() {
  const [user] = useAuthState(auth);
  const [myAds, setMyads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false)
  const toggleModalSell = () => setOpenModalSell(!openModalSell);
  const [selectedAd, setSelectedAd] = useState(null);
  const toggleModal = () => setOpenModal(!openModal);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const fetchMyads = async () => {
    if (!user) return;

    const q = query(collection(fireStore, 'products'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const ads = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setMyads(ads)
    console.log(ads)
    setLoading(false)

  }

  const handleDelete = async (adId) => {
    try {
      await deleteDoc(doc(fireStore, 'products', adId));
      fetchMyads()
      alert('ad deleted succefull');
    } catch (error) {
      console.error('erro deleteing the ads', error)
    }
  }
  const handleEditClick = (ad) => {
    setSelectedAd(ad);
    setEditModalOpen(true);
  };

  useEffect(() => {
    if (user) fetchMyads();
  }, [user])


  return (
    <>
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell toggleModalSell={toggleModalSell} status={openModalSell} setItems={() => { }} />
      <EditAd
        status={editModalOpen}
        toggleModalEdit={toggleEditModal}
        ad={selectedAd}
        onSave={fetchMyads}
      />
      
      <div className='p-10  px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>

        <h2 className="text-2xl font-bold mb-4">My Ads</h2>


        {loading ? (
          <p>Loading...</p>
        ) : myAds.length === 0 ? (
          <p>No ads posted yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
            {myAds.map((ad) => (
              <div key={ad.id} className="border border-gray-300 rounded p-4 relative shadow-md">
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover rounded mb-2" />
                <p className="font-bold text-lg">{ad.title}</p>
                <p className="text-sm text-gray-600">{ad.category}</p>
                <p className="text-sm">₹ {ad.price}</p>
                <p className="text-xs">{ad.description}</p>
                <div className="flex justify-end mt-3 gap-2">
                  {/* Future: Edit Button */}
                  <button
                    onClick={() => handleEditClick(ad)}
                    className="text-blue-500 border border-blue-500 px-2 py-1 text-sm rounded">Edit</button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="text-red-500 border border-red-500 px-2 py-1 text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
    <Footer />
    </>
  )
}

export default Myads