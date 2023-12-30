import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changedPassword, signin } from '../../actions/auth'
import { Link } from 'react-router-dom';
import PasswordPop from './PasswordPop';

const initialState = { email: '', password: '', changedPass: '' };

const MainOne = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(initialState);
  const [requestStatus, setRequestStatus] = useState({ loading: false, error: null });
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = async (e) => {
    setIsModalOpen(false);

    setRequestStatus({ loading: true, error: null });
    console.log(formData)

    try {
      await dispatch(changedPassword(formData, navigate));


      setRequestStatus({ loading: false, error: null });
    } catch (error) {
      console.log(error)
      setRequestStatus({ loading: false, error: error?.response?.data?.message });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="mt-10 mb-10 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
          LHBP IIT Ropar
        </h4>
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
          Change Password
        </h4>

        <div className="mb-10 flex items-center ">
          <div className="h-px w-full bg-gray-200 " />
        </div>
        <label class="font-semibold text-sm text-navy-700 pb-1 block">E-mail</label>

        <input required name="email"
          onChange={handleChange}
          type="email"
          class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          placeholder="Enter your email" />


        <label class="font-semibold text-sm text-navy-700 pb-1 block">Password</label>

        <input required name="password"
          onChange={handleChange}
          type="password"
          class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          placeholder="Enter your password" />

        <label class="font-semibold text-sm text-navy-700 pb-1 block">Confirm Password</label>

        <input required name="changedPass"
          onChange={handleChange}
          type="password"
          class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          placeholder="Enter your password" />

        <div className="text-center text-gray-600">
          {error && <p>{error}</p>}
        </div>
        {requestStatus.error && (
          <div className="text-center">
            <label className="font-semibold text-sm text-navy-600 pb-1 block">
              {requestStatus.error}
            </label>
          </div>
        )}
        <button onClick={handleOpenModal} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
          Change
        </button>

      </div>
      <PasswordPop
        isOpen={isModalOpen}
        Create={handleConfirm}
        cancelled={handleCancel}
        onClose={handleCancel}
      />
    </div>
  )
}

export default MainOne
