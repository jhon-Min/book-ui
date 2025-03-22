import { Link, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { Modal, Spinner, Button } from 'flowbite-react';
import { HiEye, HiEyeSlash, HiMiniLockClosed } from 'react-icons/hi2';
import useAuthStore from '../store/useAuthStore';
import { useState } from 'react';
import { GLogin } from '../components/gLogin';
import { infoNoti } from '../helper/notiMessage';

export default function BookDetail() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: detailData,
    error: detailErr,
    isLoading: detailLoading,
  } = useQuery({
    queryKey: ['detail'],
    queryFn: async () => {
      const res = await api.get(`api/v1/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['chapters', detailData?.id],
    queryFn: async () => {
      const res = await api.get(`api/v1/chapters/${detailData.id}/book`);
      return res.data;
    },
    enabled: !!detailData?.id,
  });

  if (detailLoading) {
    return (
      <div className=" flex items-center  justify-center h-screen">
        <Spinner color="failure" aria-label="Failure spinner example" />;
      </div>
    );
  }

  if (detailErr) {
    return <div>Error loading book details: {detailErr.message}</div>;
  }

  if (error) {
    return <div>Error loading chapters: {error.message}</div>;
  }

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleCancel() {
    setShowConfirmationModal(false);
  }

  const handleLoginSuccess = () => {
    onCloseModal();
  };

  const validateCoinPay = (isPremium, coin, chapterId) => (event) => {
    event.preventDefault();
    if (!token) {
      setOpenModal(true);
    }

    if (token && user.points >= coin) {
      setShowConfirmationModal(true);
      setSelectedChapter(chapterId);
    } else if (token) {
      infoNoti('လက်ကျန် coin မလုံလောက်ပါ');
    }
  };

  function handleConfirm() {
    handleCancel();
    navigate(`/chapters/${selectedChapter}`);
  }

  return (
    <>
      <img
        src={detailData.bookProfile}
        className="h-[30rem] w-full object-cover"
      />

      <div className="grid backdrop-blur-md bg-white/5 w-full h-[31rem] absolute top-[82px] left-0 md:grid-cols-2">
        <img
          src={detailData.bookProfile}
          className="rounded-lg w-72 h-[22rem] object-cover mx-auto mt-[70px] md:mt-28 xl:ms-24 xl:mt-20 xl:w-80"
        />
      </div>

      <div className="px-[15px] md:px-[140px] mt-10 text-white mb-[150px]">
        <p className="text-[25px] text-center text-red-500 mb-3">
          {detailData?.name || '---'}
        </p>
        <p>{detailData?.description || '......'}</p>

        <hr className="border-red-500 my-10" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <Spinner color="failure" aria-label="Failure spinner example" />
          ) : (
            data.map((x) => {
              return (
                <Link
                  key={x.id}
                  className="text-center bg-[#101720] py-6 rounded-[10px] border-[0.7px] border-solid border-gray-200"
                  // to={`/chapters/${x.id}`}
                  onClick={validateCoinPay(x.isPremium, x.coin, x.id)}
                >
                  <h5 className="text-lg font-bold">
                    {x.isPremium ? (
                      <HiEyeSlash
                        style={{
                          verticalAlign: 'baseline',
                          display: 'inline-block',
                        }}
                        className="mr-2"
                      />
                    ) : (
                      <HiEye
                        style={{
                          verticalAlign: 'baseline',
                          display: 'inline-block',
                        }}
                        className="mr-2"
                      />
                    )}
                    Chapter {x.no}
                  </h5>
                  <p className="mt-2 ">
                    <span className="text-red-500 mr-1">{x.coin}</span>
                    coins
                  </p>
                </Link>
              );
            })
          )}
        </div>

        {/* Login Modal */}
        <Modal
          className="pt-[120px] md:pt-0"
          show={openModal}
          size="md"
          onClose={onCloseModal}
          popup
        >
          <Modal.Header className="bg-[#101720]" />
          <Modal.Body className="bg-[#101720]">
            <GLogin
              title="Sign in to continue"
              description="Login ဝင်ပြီးဖတ်နိုင်ပါသည်။"
              isReload={true}
              onLoginSuccess={handleLoginSuccess}
            />
          </Modal.Body>
        </Modal>

        {/* Confirm Modal */}
        <Modal
          show={showConfirmationModal}
          className="pt-[120px] md:pt-0"
          onClose={handleCancel}
          size="md"
          popup
        >
          <Modal.Header className="bg-[#101720]" />
          <Modal.Body className="bg-[#101720] text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-10">
                Are you sure you want to proceed?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleConfirm}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Yes
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600"
                >
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
